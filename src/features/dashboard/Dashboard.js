import { Box, IconButton, Typography, useTheme } from "@mui/material"
import { useContext } from "react"
import Header from "../../components/Header"
import useAuth from "../../hooks/useAuth"
import MySidebar from "../global/MySidebar"
import { ColorModeContext } from "../../theme";
import { colors } from "../../theme"
import LineChart from "../../components/Line"
import BarChart from "../users/Bar"
import StatBox from "../../components/StatBox"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import useTitle from "../../hooks/useTitle"

const Dashboard =() => {
  useTitle('DASHBOARD')

    console.log("Dashboard is being rendered.");
  
const { firstName } = useAuth()

const theme = useTheme()
const myColors = colors(theme.palette.mode)
const colorMode = useContext(ColorModeContext);


    return <Box m="20px">
        <Box display="flex" 
        justifyContent="space-between" 
        alignItems="center">
    <Header title={`${firstName}'s DASHBOARD`}
    subtitle={`Welcome ${firstName} to your Personalized Dashboard`}
    />
    <MySidebar themeMode={colorMode} />
    </Box>
    <Box
     /* GRID */ 
    display="grid"
    gridTemplateColumns="repeat(12, 1fr)"
    gridAutoRows="140px"
    gap="20px"
    >
       { /* ROW 1 */ } 
        <Box
        gridColumn="span 3"
        backgroundColor={myColors.grey[900]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        >
            <StatBox
            title="GITHUB"
            subtitle="Check out the full code!"
            icon={
                <IconButton href="https://github.com/makmakcol" target="_blank" rel="noopener noreferrer">
                <GitHubIcon sx={{ color: myColors.lightPurple[300], fontSize: "26px"}}
                />
                </IconButton>
            }
            />
             </Box>
         <Box
        gridColumn="span 3"
        backgroundColor={myColors.grey[900]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        >
            <StatBox
            title="LINKEDIN"
            subtitle="Let's connect!"
            icon={
                <IconButton href="https://www.linkedin.com/in/mcolonello/">
                <LinkedInIcon sx={{ color: myColors.blueAccent[300], fontSize: "26px"}}
                />
                </IconButton>
            }
            />  
            </Box>
            <Box
        gridColumn="span 3"
        backgroundColor={myColors.grey[900]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        >
             <StatBox
            title="EMAIL"
            subtitle="Contact me!"
            icon={
                <IconButton href="mailto:makcolonello@gmail.com">
                <EmailIcon sx={{ color: myColors.pinkAccent[400], fontSize: "26px"}}
                />
                </IconButton>
            }
            />  

        </Box>

        <Box
        gridColumn="span 3"
        backgroundColor={myColors.grey[900]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        >
             <StatBox
            title="INSTAGRAM"
            subtitle="Let's be social!"
            icon={
                <IconButton href="https://www.instagram.com/makysadventures/">
                <InstagramIcon sx={{ color: myColors.redAccent[500], fontSize: "26px"}}
                />
                </IconButton>
            }
            />  

        </Box>
            {/* ROW 2 */ }
            <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={myColors.grey[900]}
            >
             <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                ml="10px"
                mt="20px"
                color={myColors.grey[100]}
              >
                Line Chart
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                ml="10px"
                mt="10px"
                color={myColors.lightPurple[500]}
              >
                Mock Transaction Data
              </Typography>
            </Box>
          
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
          </Box>
          <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={myColors.grey[900]}
          overflow="hidden"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "35px 35px 0 35px" }}
            ml="-10px"
          >
            Bar Chart
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ padding: "25px 25px 0 25px" }}
            color={myColors.lightPurple[500]}
          >
            User Balance
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>


</Box>
    </Box>
 

}

export default Dashboard

