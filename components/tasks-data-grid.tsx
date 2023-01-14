import { observer, useLocalObservable } from "mobx-react-lite";

// mui
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// own imports
import Task from "../interfaces/task.interface";

type Props = {
    tasks: Task[];
};

function TasksDataGrid(props: Props) {
    const data = useLocalObservable(() => ({ tasks: props.tasks }));

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
        }
    ];

    return (
        <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={data.tasks}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    );
}

export default observer(TasksDataGrid);
