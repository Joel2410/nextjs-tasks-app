import { v4 as uuidv4 } from "uuid";
import type { NextApiRequest, NextApiResponse } from "next";
import Task from "../../../interfaces/task.interface";

let storedTasks: Task[] = [];
let tasksLoaded = false;

const loadTasks = (): void => {
  if (tasksLoaded) return;

  tasksLoaded = true;
  // To do, should load task from database
};

const saveTasks = (): void => {
  return;
  // To do: should save task into database
};

export default function tasks(
  req: NextApiRequest,
  res: NextApiResponse<Task[]>
): void {
  switch (req.method) {
    case "PUT":
      {
        let statusCode: number = 200;
        let receivedTasks: Task[] = req.body;

        try {
          receivedTasks.forEach((task) => updateTask(task));
          saveTasks();
        } catch {
          statusCode = 400;
        }

        res.status(statusCode).end();
      }
      break;

    case "POST":
      {
        let statusCode: number = 200;
        let task: Task = req.body;

        try {
          saveTask(task);
        } catch {
          statusCode = 400;
        }

        res.status(statusCode).end();
      }
      break;
    default:
      {
        res.status(200).json(getTasks());
      }
      break;
  }
}

export function getTasks(): Task[] {
  loadTasks();
  return storedTasks;
}

export function getTaskById(id: string): Task | undefined {
  loadTasks();
  return storedTasks.find((task) => task.id === id);
}

export function getTaskByTasksListId(tasksListId: string): Task[] {
  loadTasks();
  return storedTasks.filter((task) => task.tasksListId === tasksListId);
}

export function updateTask(task: Task): boolean {
  let storedTask = storedTasks.find((mTask) => mTask.id === task.id);
  if (storedTask) {
    storedTask.title = task.title;
    storedTask.description = task.description;
    storedTask.tasksListId = task.tasksListId;
    storedTask.index = task.index;
    storedTask.deployed = task.deployed;
    return true;
  }
  return false;
}

export function saveTask(task: Task): boolean {
  task.id = uuidv4();
  storedTasks.push(task);
  saveTasks();
  return true;
}

export function deleteTaskById(id: string): void {
  storedTasks = storedTasks.filter((task) => task.id !== id);
  saveTasks();
}
