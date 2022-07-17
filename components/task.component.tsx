import Task from "../interfaces/task.interface";
import { Draggable } from "react-beautiful-dnd";
import { useContext, useState } from "react";
import { TaskContext } from "../pages";
import Link from "next/link";

type Props = {
  task: Task;
  index: number;
};

export default function TaskComponent(props: Props) {
  const index = props.index;
  const [task, setTask] = useState(props.task);
  const { onChangeTask, onDeleteTask } = useContext(TaskContext);
  const [loading, setLoading] = useState(false);

  const deployTask = async () => {
    setLoading(true);
    const newTask = { ...task, deployed: !task.deployed };
    await onChangeTask?.(newTask);
    setTask(newTask);
    setLoading(false);
  };

  const deleteTask = async () => {
    setLoading(true);
    await onDeleteTask?.(task);
    setLoading(false);
  };

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
                <h5 className="col-10">{task.title}</h5>
                <button
                  className={`col-2 btn btn-outline-${
                    task.deployed ? "danger" : "secondary collapsed"
                  }`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#collapse" + task.id}
                  aria-expanded={task.deployed}
                  aria-controls={"collapse" + task.id}
                  onClick={deployTask}
                  disabled={loading}
                >
                  {task.deployed ? "-" : "+"}
                </button>
              </div>
            </div>

            <div
              id={"collapse" + task.id}
              className={`accordion-collapse collapse ${
                task.deployed ? "show" : ""
              }`}
              aria-labelledby={"heading" + task.id}
            >
              <div className="accordion-body">
                <p>{task.description}</p>
                <div className="footer row">
                  <button
                    type="button"
                    className="col btn btn-danger mx-2"
                    data-bs-toggle="modal"
                    data-bs-target="#DeleteConfirmation"
                    onClick={deleteTask}
                  >
                    Delete
                  </button>
                  <Link href={`task-form?taskId=${task.id}`}>
                    <button type="button" className="col btn btn-primary mx-2">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
