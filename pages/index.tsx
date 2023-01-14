import React, { useEffect, useRef, useMemo } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { action, runInAction } from "mobx";
import { useLocalObservable, observer } from "mobx-react-lite";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

// own imports
import Task from "../interfaces/task.interface";
import TasksList from "../interfaces/tasks-list.interface";
import TasksListComponent from "../components/tasks-list.component";
import BaseModalComponent from "../components/base-modal.component";
import { tasksService } from "./_app";
import TasksDataGrid from "../components/tasks-data-grid";
import Link from "next/link";

type Props = {
  storedTasksLists: TasksList[];
};

type TaskContextValue = {
  onChangeTask?: (task: Task) => Promise<void>;
  onDeleteTask?: (task: Task) => Promise<void>;
};

export const TaskContext = React.createContext<TaskContextValue>({});

const Home: NextPage<Props> = ({ storedTasksLists }) => {
  const data = useLocalObservable(() => ({
    tasksLists: storedTasksLists,
    ready: false,
    open: false,
  }));

  const taskRef = useRef<Task>();

  useEffect(() => {
    if (typeof window === "object") {
      runInAction(() => {
        data.ready = true;
      });
    }
  }, [data]);

  const onDragEnd = action(async (result: DropResult): Promise<void> => {
    if (!result.source || !result.destination) {
      return;
    }

    const originList = data.tasksLists.find(
      (list) => list.id === result.source.droppableId
    );
    if (!originList) {
      return;
    }

    const destinationList = data.tasksLists.find(
      (list) => list.id === result.destination?.droppableId
    );
    if (!destinationList) {
      return;
    }

    const draggedTask = originList.tasks[result.source.index];
    if (!draggedTask) {
      return;
    }

    draggedTask.tasksListId = destinationList.id;
    originList.tasks.splice(result.source.index, 1);
    destinationList.tasks.splice(result.destination.index, 0, draggedTask);

    originList.tasks.forEach((task, index) => {
      task.index = index;
    });

    if (originList.id !== destinationList.id) {
      destinationList.tasks.forEach((task, index) => {
        task.index = index;
      });
    }

    const updatedTasks = [...originList.tasks];

    if (originList.id !== destinationList.id) {
      updatedTasks.push(...destinationList.tasks);
    }

    try {
      await tasksService.updateTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  });

  const onChangeTask = action(async (taskToUpdate: Task): Promise<void> => {
    const tasksList = data.tasksLists.find(
      (list) => list.id === taskToUpdate.tasksListId
    );
    if (!tasksList) return;

    const originalTask = tasksList.tasks.find(
      (task) => task.id === taskToUpdate.id
    );
    if (originalTask == null) return;

    originalTask.deployed = taskToUpdate.deployed;

    await tasksService.updateTasks([originalTask]);
  });

  const onDeleteTask = action(async (task: Task): Promise<void> => {
    taskRef.current = task;
    data.open = true;
  });

  const providerValues = useMemo(
    () => ({
      onChangeTask,
      onDeleteTask,
    }),
    [onChangeTask, onDeleteTask]
  );

  const handleDeleteDialog = action(async (choose: boolean) => {
    data.open = false;
    if (!choose) return;
    if (!taskRef.current) return;

    const tasksList = data.tasksLists.find(
      (list) => list.id === taskRef.current?.tasksListId
    );
    if (!tasksList) return;

    const currentTask = tasksList.tasks.find(
      (task) => task.id === taskRef.current?.id
    );
    if (currentTask) {
      tasksList.tasks = tasksList.tasks.filter(
        (task) => task.id !== currentTask.id
      );

      await tasksService.deleteTask(currentTask);
    }
  });

  return (
    <div className="container">
      <Head>
        <title>Tasks App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="my-5">
          <h1 className="my-2">Tasks App!</h1>

          <Link href="/users">
            <h5 style={{ color: "blue", cursor: "pointer", maxWidth: 150 }}>
              Go to users list
            </h5>
          </Link>
        </div>

        <div className="row mb-4">
          {data.ready && <TasksDataGrid tasksLists={data.tasksLists} />}
        </div>

        <div className="row">
          {data.ready && (
            <DragDropContext onDragEnd={onDragEnd}>
              {data.tasksLists.map((tasksList) => (
                <TaskContext.Provider key={tasksList.id} value={providerValues}>
                  <TasksListComponent tasksList={tasksList} />
                </TaskContext.Provider>
              ))}
            </DragDropContext>
          )}
        </div>
      </main>

      <BaseModalComponent
        title="Alert"
        body="Are you sure you want to delete this task?"
        open={data.open}
        dialogResult={handleDeleteDialog}
      />
    </div>
  );
};

export async function getServerSideProps(): Promise<{ props: Props }> {
  const data = await tasksService.getTasksLists();

  data.forEach((list) => {
    list.tasks = sortedTasks(list);
  });

  return { props: { storedTasksLists: data } };
}

const sortedTasks = (list: TasksList): Task[] => {
  return list.tasks.sort(compareTaskIndex);
};

const compareTaskIndex = (taskA: Task, taskB: Task): number => {
  return taskA.index < taskB.index ? -1 : 0;
};

export default observer(Home);
