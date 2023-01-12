import { useContext, useState } from "react";
import Link from "next/link";
import { Draggable } from "react-beautiful-dnd";

// mui
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from "@mui/material/Button";

// own imports
import Task from "../interfaces/task.interface";
import { TaskContext } from "../pages";

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
    if (loading) return;

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
          <Accordion
            ref={provided.innerRef}
            expanded={task.deployed}

            className="mb-3">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              disableRipple={false}
              onClick={deployTask}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="subtitle2" >{task.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" className="card p-2"> {task.description} </Typography>
              <div className="footer row mt-4">
                <Button
                  type="button"
                  variant="contained"
                  className="col mx-2"
                  color="secondary"
                  onClick={deleteTask}
                >
                  Delete
                </Button>
                <Link href={`task-form?taskId=${task.id}`}>
                  <Button
                    type="button"
                    variant="contained"
                    className="col mx-2"
                    color="primary"
                  >
                    Edit
                  </Button>
                </Link>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </Draggable>
  );
}
