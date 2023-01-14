import { useContext } from "react";
import Link from "next/link";
import { action, runInAction } from "mobx";
import { useLocalObservable, Observer } from "mobx-react-lite";
import { Draggable } from "react-beautiful-dnd";

// mui
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  const { onChangeTask, onDeleteTask } = useContext(TaskContext);
  const data = useLocalObservable(() => ({
    task: props.task,
    loading: false,
  }));

  const deployTask = action(async () => {
    if (data.loading) return;

    data.loading = true;
    data.task.deployed = !data.task.deployed;
    await onChangeTask?.(data.task);

    // NOTE: This is because it is running after await
    runInAction(() => {
      data.loading = false;
    });
  });

  const deleteTask = action(async () => {
    data.loading = true;

    await onDeleteTask?.(data.task);

    // NOTE: This is because it is running after await
    runInAction(() => {
      data.loading = false;
    });
  });

  return (
    <Draggable draggableId={data.task.id} index={index}>
      {(provided, _snapshot) => (
        <Observer>
          {() => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Accordion
                ref={provided.innerRef}
                expanded={data.task.deployed}
                className="mb-3"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  disableRipple={false}
                  onClick={deployTask}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="subtitle2">{data.task.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" className="card p-2">
                    {data.task.description}
                  </Typography>
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
                    <Link href={`task-form?taskId=${data.task.id}`}>
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
        </Observer>
      )}
    </Draggable>
  );
}
