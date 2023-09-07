import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "./authApiSlice";
import { IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import CircularProgress from "@mui/material/CircularProgress";

const Logout = () => {
    const navigate = useNavigate();
  
    const [sendLogout, { isLoading, isSuccess }] = useSendLogoutMutation();
  
    useEffect(() => {
      if (isSuccess) navigate('/');
    }, [isSuccess, navigate]);
  
    const onLogoutClicked = () => sendLogout();
  
    if (isLoading) return <CircularProgress size={20} />;
  
    return (
      <IconButton onClick={onLogoutClicked}>
        <LogoutIcon />
      </IconButton>
    );
  };
export default Logout  
