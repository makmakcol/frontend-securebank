import { useGetAllDataQuery } from "./alldataApiSlice";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import AllData from "./AllData";
import { Link } from "react-router-dom";
import {  useTheme, IconButton } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import CircularProgress from "@mui/material/CircularProgress";
import { colors } from "../../theme";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";


const AllDataList = () => {
    useTitle('USER DATA')
    const { username, isEditor, isAdmin } = useAuth()

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAllDataQuery('alldataList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    console.log(users)

    const usersArray = users ? users.ids.map(id => users.entities[id]) : [];
    const theme = useTheme()
    const myColors = colors(theme.palette.mode)

   const columns = [
    { field: "id", headerName: "ID", width: 200},
    { field: "firstName", headerName: "First Name", width: 125},
    { field: "lastName", headerName: "Last Name", width: 125},
    { field: "email", headerName: "Email", width: 200},
    { field: "username", headerName: "Username", width: 150},
    { field: "balance", headerName: "Balance", width: 100},
    { field: "roles", headerName: "Role", width: 100},
    {
        field: "edit",
        headerName: "Edit",
        width: 150,
        renderCell: (params) => {
            const editPath = `/users/${params.row.id}`;
            return (
                <>
                <AllData user={params.row} />
                <IconButton
                    component={Link} to={editPath}>
                        <EditNoteIcon />
                </IconButton>
                </>  
        )
    }
}
   ]

    if (isLoading) return (<div style={{
        display: 'flex', justifyContent: 'center',
        alignItems: 'center', height:'100vh'
    }}><CircularProgress size={100} /></div> )

    if (isError) {
        return <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>
    }

    if (isSuccess) {

        let filteredUsersArray;

        if (isEditor || isAdmin) {
            filteredUsersArray = [...usersArray]
        } else {
            filteredUsersArray = usersArray.filter(user => user.username === username)
        }

        return (
            <>
            <Header title="ALL USER DATA" subtitle="Access to pertinent data of users" />
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                rows={filteredUsersArray}
                columns = {columns}
                pageSize={5}
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: myColors.blueAccent[900],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: myColors.grey[900],
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: myColors.grey[900],
                },
            }}
                />
            </div>
            </>


        );
    }
}

export default AllDataList