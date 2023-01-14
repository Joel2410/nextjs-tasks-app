import { observer, useLocalObservable } from "mobx-react-lite";

// mui
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// own imports
import Task from "../interfaces/task.interface";
import TasksList from "../interfaces/tasks-list.interface";

type Props = {
  tasksLists: TasksList[];
};

function TasksDataGrid(props: Props) {
  const data = useLocalObservable(() => ({ tasksLists: props.tasksLists }));

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
  ];

  const getTasks = (): Task[] => {
    const tasks: Task[] = [];
    data.tasksLists.forEach((tasksList) => {
      tasksList.tasks.forEach((task) => {
        task.status = tasksList.title;
        tasks.push(task);
      });
    });
    return tasks;
  };

  return (
    <Box sx={{ height: 280, width: "100%" }}>
      <DataGrid
        rows={getTasks()}
        columns={columns}
        pageSize={3}
        rowsPerPageOptions={[3]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}

export default observer(TasksDataGrid);
