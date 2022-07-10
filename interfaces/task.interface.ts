export default interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  tasksListId: string;
  index: number;
  collapsed?: boolean;
}
