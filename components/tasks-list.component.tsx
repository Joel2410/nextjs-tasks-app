import TasksList from "../interfaces/tasks-list.interface";
import TaskComponent from "./task.component";
import { Droppable } from "react-beautiful-dnd";

type Props = {
  tasksList: TasksList;
};

export default function TasksListComponent(props: Props) {
  const tasksList = props.tasksList;
  return (
    <Droppable droppableId={tasksList.id}>
      {(provided, _snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="col"
        >
          <div className="card p-4">
            <h2 className="mb-5">{tasksList.title}</h2>
            <div>
              {tasksList.tasks.map((task, index) => (
                <div
                  key={task.id}
                  className="accordion"
                  id={"accordionExample" + tasksList.id}
                >
                  <TaskComponent task={task} index={index} />
                </div>
              ))}
            </div>
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}
