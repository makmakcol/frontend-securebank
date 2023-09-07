import { Box, Grid, useTheme } from "@mui/material";
import { colors } from "../theme";
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const Footer = () => {
    const theme = useTheme();
    const myColors = colors(theme.palette.mode);   

    return (
        <Box 
           mt={4}
           py={2}
           sx={{
            backgroundColor: "transparent"
           }}
           width="100%"
           textAlign="center"
        >
            <Grid container justifyContent="center" alignItems="center" spacing={3}>
                <Grid item>
                    <a href="https://github.com/makmakcol" target="_blank" rel="noopener noreferrer">
                        <GitHubIcon
                        sx={{
                            backgroundColor: myColors.lightPurple[400],
                            borderRadius: '50%',
                            padding: '3px',
                            color: "whitesmoke",
                            transition: 'color 0.3s ease-in-out',
                            '&:hover': {
                                color: 'rgb(33, 31, 31)'
                            }
                        }}
                         />
                    </a>
                </Grid>
                <Grid item>
                    <a href="mailto:makcolonello@gmail.com">
                        <EmailIcon
                        sx={{
                            backgroundColor: myColors.blueAccent[200],
                            borderRadius: '50%',
                            padding: '3px',
                            color: "whitesmoke",
                            transition: 'background 0.3s ease-in-out',  
                            '&:hover': { 
                               color: 'rgb(199,22,16)'
                            }
                        }} />
                    </a>
                </Grid>
                <Grid item>
                    <a href="https://www.linkedin.com/in/mcolonello/">
                        <LinkedInIcon 
                        sx={{
                            backgroundColor: myColors.pinkAccent[300],
                            borderRadius: '50%',
                            padding: '3px',
                            color: "whitesmoke",
                            transition: 'background 0.3s ease-in-out',  
                            '&:hover': { 
                               color: 'rgb(10, 102, 194)'
                            }
                        }} />
                    </a>
                </Grid>
            </Grid>
        </Box>     
    );
};

export default Footer;
