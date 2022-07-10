import Task from "../interfaces/task.interface";
import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";

type Props = {
  task: Task;
  index: number;
};

export default function TaskComponent(props: Props) {
  const [task, setTask] = useState(props.task);
  const index = props.index;
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, _snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="accordion-item mb-3">
            <div className="accordion-header" id={"heading" + task.id}>
              <div className="row py-3 px-4">
                <h4 className="col-10">{task.title}</h4>
                <button
                  className="col-2 btn btn-outline-secondary collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#collapse" + task.id}
                  aria-expanded="false"
                  aria-controls={"collapse" + task.id}
                  onClick={() => {
                    const newTask = { ...task };
                    newTask.collapsed = !newTask.collapsed;
                    setTask(newTask);
                  }}
                >
                  {task.collapsed ? "-" : "+"}
                </button>
              </div>
            </div>

            <div
              id={"collapse" + task.id}
              className="accordion-collapse collapse"
              aria-labelledby={"heading" + task.id}
            >
              <div className="accordion-body">
                <p>{task.description}</p>
                <div className="footer row">
                  <button type="button" className="col btn btn-danger mx-2">
                    Delete
                  </button>

                  <button type="button" className="col btn btn-primary mx-2">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
