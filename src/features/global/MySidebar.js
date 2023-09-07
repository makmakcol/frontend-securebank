import { useEffect, useState } from "react"
import { useTheme, IconButton } from "@mui/material"
import "../../styles/MySidebar.css"
import useAuth from "../../hooks/useAuth"
import DashboardIcon from '@mui/icons-material/Dashboard'
import EditNoteIcon from '@mui/icons-material/EditNote';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import ShowChartIcon  from "@mui/icons-material/ShowChart"
import PlaceIcon from '@mui/icons-material/Place';
import MenuIcon from '@mui/icons-material/Menu';
import { Link} from "react-router-dom";




const MySidebar = () => {

  const { firstName, lastName , roles , username} = useAuth()

  const [open, setOpen] = useState(true)

  useEffect(() => {
    console.log('open state:', open)

  }, [open])

  const theme = useTheme()
 
  return (
    <div className={`sidebar ${open ? 'open' : 'closed'} ${theme.palette.mode === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      {open && (
    <div className="title-container">
      <div className="title">{firstName ? firstName : 'Loading'} {lastName ? lastName : 'Loading'}</div>
      <div className="subtitle">{roles ? roles.join(", ") : 'No Roles'}</div>
    </div>
      )}
      <div className="toggle-button">
      <IconButton 
      onClick={() => {
        
        setOpen(prevOpen => !prevOpen)
       }}>
        <MenuIcon />
      </IconButton>
      </div>

    {open && (
    <div className="sidebar dark-theme">
      <div className="icon-container">
        <div className="icon-item">
          <Link to="/dash">
        <DashboardIcon className="link-icon" />
        </Link>
        <span className="icon-title">Dashboard</span>
        </div>
        
        <div className="icon-item">
          <Link to="/users">
        <EditNoteIcon className="link-icon" />
        </Link>
        <span className="icon-title">Edit Account</span>
        </div> 
        <div className="icon-item">
          <Link to={`/bar/${username}`}>
        <BarChartIcon className="link-icon" />
        </Link>
        <span className="icon-title">Bar Chart</span>
        </div>
        <div className="icon-item">
          <Link to={`/pie/${username}`}>
        <PieChartIcon className="link-icon" />
        </Link>
        <span className="icon-title">Pie Chart</span>
        </div>
        <div className="icon-item">
          <Link to='/line'>
        <ShowChartIcon className="link-icon" />
        </Link>
        <span className="icon-title">Line Chart</span>
        </div>
        <div className="icon-item">
          <Link to="/geo">
        <PlaceIcon className="link-icon" />
        </Link>
        <span className="icon-title">Geography Chart</span>
      </div>
      </div>
      </div>

   )}
  
  </div>
  )
}

export default MySidebar