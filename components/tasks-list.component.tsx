import TasksList from "../interfaces/tasks-list.interface";
import TaskComponent from "./task.component";
import { Droppable } from "react-beautiful-dnd";
import { Fragment } from "react";
import Link from "next/link";

type Props = {
  tasksList: TasksList;
};

export default function TasksListComponent(props: Props) {
  const tasksList = props.tasksList;
  return (
    <Droppable droppableId={tasksList.id}>
      {(provided, _snapshot) => (
        <div
          {...provided.droppableProps}
          className="col-12 col-md-6 col-lg-4 mb-5"
        >
          <div className="card p-4">
            <h4 className="">{tasksList.title}</h4>
            <div
              ref={provided.innerRef}
              className="accordion"
              id={"accordionExample" + tasksList.id}
            >
              {tasksList.tasks.map((task, index) => (
                <Fragment key={task.id}>
                  <TaskComponent task={task} index={index} />
                </Fragment>
              ))}
            </div>
            {provided.placeholder}
            <Link href={`task-form/?tasksListId=${tasksList.id}`}>
              <button className="col btn btn-outline-success" type="button">
                Add new task
              </button>
            </Link>
          </div>
        </div>
      )}
    </Droppable>
  );
}
