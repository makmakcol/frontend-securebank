import { Typography, Box, useTheme } from "@mui/material";
import { colors } from "../theme";



const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const myColors = colors(theme.palette.mode);

  return (
    <Box 
      mb="30px" 
      p={3} 
    >
      <Typography
        variant="h2"
        color={myColors.lightPurple[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
        <Typography
          variant="h5"
          color={myColors.blueAccent[100]}
        >
          {subtitle}
        </Typography>
      </Typography>
    </Box>
  );
};

export default Header;
