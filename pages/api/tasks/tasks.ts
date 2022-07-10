import type { NextApiRequest, NextApiResponse } from "next";
import Task from "../../../interfaces/task.interface";

const storedTasks: Task[] = [
  {
    id: "1",
    title: "Task 1",
    description: "lorem x1",
    completed: true,
    tasksListId: "3",
    index: 0,
  },
  {
    id: "2",
    title: "Task 2",
    description: "lorem x2",
    completed: false,
    tasksListId: "2",
    index: 0,
  },
  {
    id: "3",
    title: "Task 3",
    description: "lorem x3",
    completed: false,
    tasksListId: "1",
    index: 0,
  },
  {
    id: "4",
    title: "Task 4",
    description: "lorem x4",
    completed: false,
    tasksListId: "1",
    index: 1,
  },
];

export default function tasks(
  req: NextApiRequest,
  res: NextApiResponse<Task[]>
): void {
  if (req.method == "GET") {
    res.status(200).json(getTasks());
  } else if (req.method == "PUT") {
    let statusCode: number = 200;

    let receivedTasks: Task[] = req.body;

    try {
      receivedTasks.forEach((task) => updateTask(task));
    } catch {
      statusCode = 400;
    }

    res.status(statusCode).end();
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

export function updateTask(task: Task): boolean {
  let fTask = storedTasks.find((mTask) => mTask.id === task.id);
  if (fTask) {
    fTask.title = task.title;
    fTask.description = task.description;
    fTask.completed = task.completed;
    fTask.tasksListId = task.tasksListId;
    fTask.index = task.index;
    return true;
  }
  return false;
}
