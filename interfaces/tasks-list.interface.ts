// own imports
import Task from "./task.interface";

export default interface TasksList {
  id: string;
  title: string;
  tasks: Task[];
}
