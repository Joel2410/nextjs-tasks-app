export default interface Task {
  id: string;
  title: string;
  description: string;
  tasksListId: string;
  index: number;
  deployed: boolean;
  status?: string;
}
