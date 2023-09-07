
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import { useSelector } from "react-redux"
import { selectAllDataById } from "./alldataApiSlice"

const AllData = ({ userId }) => {
    const user = useSelector(state => selectAllDataById(state, userId))
    const navigate = useNavigate();

    if (!user) return null;

    const handleEdit = () => navigate(`/users/${user.id}`)
    const userRolesString = user.roles.toString().replaceAll(',', ', ');

    return (
        <div>
            <p>First Name: {user.firstName} </p>
            <p>Last Name: {user.lastName} </p>
            <p>Email: {user.email} </p>
            <p>Username: {user.username} </p>
            <p>Balance: {user.balance} </p>
            <p>Role: {userRolesString} </p>
            <Button onClick={handleEdit} variant="contained" color="primary">
                Edit
            </Button>
        </div>
    );
}


export default AllData