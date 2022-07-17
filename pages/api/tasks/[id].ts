import type { NextApiRequest, NextApiResponse } from "next";
import Task from "../../../interfaces/task.interface";
import { deleteTaskById, getTaskById } from "./tasks";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task>
) {
  const id = req.query?.id as string;

  const task = getTaskById(id);
  if (!task) {
    res.status(404).end(id);
    return;
  }

  if (req.method === "GET") {
    res.status(200).json(task);
  } else if (req.method === "DELETE") {
    deleteTaskById(id);
    res.status(200).end(id);
  }
}
