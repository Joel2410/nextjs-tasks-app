import type { NextPage } from "next";
import Head from "next/head";
import Task from "../interfaces/task.interface";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { tasksService } from "./_app";

type Props = {
  task: Task;
};

const TaskForm: NextPage<Props> = ({ task }) => {
  const router = useRouter();

  const [formData, setFormData] = useState<Task>(
    task ?? tasksService.newTask()
  );

  const isEdit = !!task.id;

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (isEdit) {
      if (await tasksService.updateTask(formData)) {
        router.push("/");
        return;
      }
      return;
    }

    const tasksListId = router.query?.tasksListId as string;
    if (
      await tasksService.saveTask({
        ...formData,
        deployed: false,
        index: -1,
        tasksListId,
      })
    ) {
      router.push("/");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <div className="container">
      <Head>
        <title>Tasks App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="row justify-content-center">
        <h1 className="my-5 text-center">Create Task!</h1>

        <form
          onSubmit={handleSubmit}
          method="post"
          className="row card p-4"
          style={{ width: "400px" }}
        >
          <div className="col mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="To do..."
              required
              minLength={4}
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="col mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Something..."
              required
              minLength={4}
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <div className="row justify-content-between px-3">
              <Link href="/">
                <button type="button" className="col-4 btn btn-danger">
                  Cancel
                </button>
              </Link>

              <button type="submit" className="col-4 btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export async function getServerSideProps(context: {
  query: { taskId: string };
}): Promise<{ props: Props }> {
  const { query } = context;
  const taskId = query?.taskId;

  if (!taskId) {
    return { props: { task: tasksService.newTask() } };
  }

  const task = await tasksService.getTask(taskId);

  return { props: { task } };
}

export default TaskForm;
