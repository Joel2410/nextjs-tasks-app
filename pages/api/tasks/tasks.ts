// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Task from "../../../interfaces/task.interface";

const storedTasks: Task[] = [
  {
    id: "1",
    title: "Task 1",
    description: "lorem x1",
    completed: true,
    tasksListId: "3",
  },
  {
    id: "2",
    title: "Task 2",
    description: "lorem x2",
    completed: false,
    tasksListId: "2",
  },
  {
    id: "3",
    title: "Task 3",
    description: "lorem x3",
    completed: false,
    tasksListId: "1",
  },
  {
    id: "4",
    title: "Task 4",
    description: "lorem x4",
    completed: false,
    tasksListId: "1",
  },
];

export default function tasks(
  req: NextApiRequest,
  res: NextApiResponse<Task[]>
): void {
  if (req.method == "GET") {
    res.status(200).json(getTasks());
  }
}

export function getTasks(): Task[] {
  return storedTasks;
}

export function getTaskById(id: string): Task | undefined {
  return storedTasks.find((task) => task.id === id);
}

export function getTaskByTasksListId(tasksListId: string): Task[] {
  return storedTasks.filter((task) => task.tasksListId === tasksListId);
}
