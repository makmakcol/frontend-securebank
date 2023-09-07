import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ColorModeContext, colors } from "../../theme";
import Logout from "../auth/Logout";
import LightModeOutlinedIcon  from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon  from "@mui/icons-material/DarkModeOutlined";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DashboardIcon from '@mui/icons-material/Dashboard';



const Navbar = () => {

  const theme = useTheme();
  const myColors = colors(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);


  return (
    <Box
    display="flex" justifyContent="right" p={2}>
    
      {/* ICONS */}
      <Box display="flex">
        <IconButton component={Link} to="/dash"
        sx={{
          transition: 'background 0.3s ease-in-out',
          '&:hover': {
            color: myColors.blueAccent[200]
          }
        }}>
        <DashboardIcon />
        </IconButton>
        <IconButton 
        component={Link} to="/login"
        sx={{
          transition: 'background 0.3s ease-in-out',  
          '&:hover': { 
             color: myColors.redAccent[400] }
        }}>
        <EnhancedEncryptionIcon />
        </IconButton>
        <IconButton component={Link} to="/createaccount"
         sx={{
          transition: 'background 0.3s ease-in-out',  
          '&:hover': { 
             color: myColors.blueAccent[400] }
        }}>
          <PersonAddIcon />
        </IconButton>
        <IconButton component={Link} to="/balance"
         sx={{
          transition: 'background 0.3s ease-in-out',  
          '&:hover': { 
             color: myColors.lightPurple[400] }
        }}>
          <AccountBalanceIcon />
        </IconButton>
        <IconButton component={Link} to="/users"
         sx={{
          transition: 'background 0.3s ease-in-out',  
          '&:hover': { 
             color: myColors.pinkAccent[300] }
        }}>
          <AnalyticsIcon />
        </IconButton>
        <IconButton
        >
          <Logout
         />
        </IconButton>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
          
        </IconButton>
      </Box>

    </Box>
  )
}

export default Navbar