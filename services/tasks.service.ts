// own imports
import { API } from "../commons/constants";
import Task from "../interfaces/task.interface";
import TasksList from "../interfaces/tasks-list.interface";

export default class TasksService {
  newTask(): Task {
    return {
      id: "",
      title: "",
      description: "",
      tasksListId: "",
      deployed: false,
      index: -1,
    };
  }

  async getTasksLists(): Promise<TasksList[]> {
    const res = await fetch(`${API}/tasks-list`);
    const data: TasksList[] = await res.json();
    return data;
  }

  async getTask(id: string): Promise<Task> {
    const res = await fetch(`${API}/tasks/${id}`);

    if (res.status !== 200) {
      return this.newTask();
    }

    const data: Task = await res.json();

    return data;
  }

  async saveTask(task: Task): Promise<boolean> {
    const res = await fetch(`${API}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    return res.status === 200;
  }

  async updateTask(task: Task): Promise<boolean> {
    const res = await fetch(`${API}/tasks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([task]),
    });

    return res.status === 200;
  }

  async updateTasks(tasks: Task[]): Promise<boolean> {
    const res = await fetch(`${API}/tasks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tasks),
    });

    return res.status === 200;
  }

  async deleteTask(task: Task): Promise<boolean> {
    const res = await fetch(`${API}/tasks/${task.id}`, {
      method: "DELETE",
    });

    return res.status === 200;
  }
}
