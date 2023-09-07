import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectAllDataById } from './alldataApiSlice'
import EditUserForm from './EditUserForm';



const EditUser = () => {
  
  const { id } = useParams()

  const user = useSelector(state => selectAllDataById(state, id))

  const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>

  return content
}

export default EditUser