import type { NextApiRequest, NextApiResponse } from "next";
import Task from "../../../interfaces/task.interface";
import tasks from "./tasks";

export default function index(
  req: NextApiRequest,
  res: NextApiResponse<Task[]>
): void {
  tasks(req, res);
}
