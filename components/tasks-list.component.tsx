import styles from "../styles/Home.module.css";
import TasksList from "../interfaces/tasks-list.interface";
import TaskComponent from "./task.component";

export default function TasksListComponent(props: { tasksList: TasksList }) {
  const tasksList = props.tasksList;
  return (
    <>
      <h2 className={styles.textcenter}>{tasksList.title}</h2>
      <hr />
      <div>
        {tasksList.tasks.map((task) => (
          <TaskComponent key={task.id} task={task} />
        ))}
      </div>
    </>
  );
}
