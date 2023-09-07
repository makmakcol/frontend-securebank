import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";


const useAuth = () => {

    const token = useSelector(selectCurrentToken)
    console.log("Token: ", token)
    let isEditor = false
    let isAdmin = false
    let status = "User"

    if (token) {
        const decoded = jwtDecode(token)
        console.log("Decoded: ", decoded)
        const { firstName, lastName, username, roles } = decoded.UserInfo

        isEditor = roles.includes('Editor')
        isAdmin = roles.includes('Admin')

        if (isEditor) status = "Editor"
        if (isAdmin) status = "Admin"

        return { firstName, lastName, username, roles, status, isEditor, isAdmin }
    }
    return { firstName: '', lastName: '',  username: '', roles: [], isEditor, isAdmin, status }
}

export default useAuth