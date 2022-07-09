import styles from "../styles/Home.module.css";
import Task from "../interfaces/task.interface";

export default function TaskComponent(props: { task: Task }) {
  const task = props.task;
  return (
    <div className={styles.card}>
      <h4>{task.title}</h4>
      <hr />
      <p>{task.description}</p>
    </div>
  );
}
