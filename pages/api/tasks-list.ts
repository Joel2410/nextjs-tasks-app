// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import TasksList from "../../interfaces/tasks-list.interface";
import { getTaskByTasksListId } from "./tasks/tasks";

const storedTasksList: TasksList[] = [
  {
    id: "1",
    title: "To do",
    tasks: [],
  },
  {
    id: "2",
    title: "Doing",
    tasks: [],
  },
  {
    id: "3",
    title: "Done",
    tasks: [],
  },
];

export default function tasksList(
  req: NextApiRequest,
  res: NextApiResponse<TasksList[]>
): void {
  if (req.method == "GET") {
    const completedTaskList = [...storedTasksList];

    completedTaskList.forEach((mTasksList) => {
      getTaskByTasksListId(mTasksList.id).forEach((task) =>
        mTasksList.tasks.push(task)
      );
    });
    res.status(200).json(completedTaskList);
  }
}
