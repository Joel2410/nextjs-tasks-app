import type { NextApiRequest, NextApiResponse } from "next";
import Task from "../../../interfaces/task.interface";
import { getTaskById } from "./tasks";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task>
) {
  const { id } = req.query;
  const task = getTaskById(id as string);

  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).end(id);
  }
}
