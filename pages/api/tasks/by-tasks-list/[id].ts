import type { NextApiRequest, NextApiResponse } from "next";

// own imports
import Task from "../../../../interfaces/task.interface";
import { getTaskByTasksListId } from "../tasks";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task[]>
) {
  const { id } = req.query;
  res.status(200).json(getTaskByTasksListId(id as string));
}
