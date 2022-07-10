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
    res.status(200).json(getTasksLists());
  }
}

export const getTasksLists = (): TasksList[] => {
  const completedTaskList: TasksList[] = [...storedTasksList];

  completedTaskList.forEach((mTasksList) => {
    mTasksList.tasks = [];
    getTaskByTasksListId(mTasksList.id).forEach((task) =>
      mTasksList.tasks.push(task)
    );
  });

  return completedTaskList;
};
