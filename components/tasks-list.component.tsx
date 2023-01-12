import { Fragment } from "react";
import Link from "next/link";
import { Droppable } from "react-beautiful-dnd";

// mui
import Button from "@mui/material/Button";

// own imports
import TasksList from "../interfaces/tasks-list.interface";
import TaskComponent from "./task.component";

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
            <h4 className="mb-4">{tasksList.title}</h4>
            <div
              ref={provided.innerRef}
            >
              {tasksList.tasks.map((task, index) => (
                <Fragment key={task.id}>
                  <TaskComponent task={task} index={index} />
                </Fragment>
              ))}
            </div>
            {provided.placeholder}
            <Link href={`task-form/?tasksListId=${tasksList.id}`}>
              <Button
                type="button"
                variant="outlined"
                className="col mx-2"
                color="success"
              >
                Add new task
              </Button>
            </Link>
          </div>
        </div>
      )}
    </Droppable>
  );
}
