import { Link } from 'react-router-dom'
import { Box, Button, Container, useTheme, useMediaQuery, Typography, Grid } from "@mui/material"
import { colors } from '../theme'
import Header from './Header'
import Footer from './Footer'


// public landing page
const Public = () => {

const theme = useTheme()
const myColors = colors(theme.palette.mode);
const matches = useMediaQuery(theme.breakpoints.up('md'))

const darkBackgroundImage = "url('./images/adrienolichon_unsplash.png')";
const lightBackgroundImage = "url('./images/adrienolichon_unsplash.png')";

const smallFont = matches ? {} : { fontSize: '0.8em'}
const smallSpacing = matches ? 3 : 1

    return (
        <Box style={{ 
            position: 'relative',
            minHeight: '100vh',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'}}>
            {/* Background Container */}
            <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: -1,
            }}>
                {/* White Overlay */}
                {theme.palette.mode === 'light' && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.7)',
                        zIndex: 1
                    }}
                    />
                )}
                {/* Background Image */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundImage: theme.palette.mode === 'dark' ? darkBackgroundImage : lightBackgroundImage,
                    zIndex: 0
                }}
                />
            </div>
            <Container style={{ maxWidth: '100%' }}>
                {/* Header */}
            <Box display="flex" justifyContent="center" alignItems="center" pt={1} style={{ textAlign: 'center' }}>
            <Header  title="SECURE BANK" subtitle="Makayala Colonello's MERN Fullstack Project" />
            </Box>
            {/* Content */}
            <Box p={smallSpacing}>
                <Grid container spacing={smallSpacing}>
                    <Grid item xs={12} style={{ marginBottom: '0.5em' }}>
                <Typography variant="h3" gutterBottom align="center" style={smallFont}>
                  🌟 About Secure Bank 🌟
                </Typography>
                <Typography variant="h5" paragraph align="center">
                  As my first published MERN Full-stack portfolio project, Secure Bank showcases my learning and growth via robust backend development, seamless frontend integration, and tasteful styling. Explore this application to see my software development progress and knowledge displayed and executed!
                </Typography>
                </Grid>
                </Grid>

               
                <Grid container  item spacing={smallSpacing} style={{ marginTop: '2em' }}>
                <Grid item xs={12} md={4}>
                <Typography variant="h4" gutterBottom style={smallFont}>
                   ⚙️ Backend Structure ⚙️
                </Typography>
                <Typography variant="body1" paragraph>
                    The application backend is crafted with MongoDB, Express, and Node.js. Through the utlization of RESTful API functionality, CRUD (Create, Read, Update, Delete) operations are smoothly integrated, enabling a clean and straighforward user experience.
                </Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                <Typography variant="h4" gutterBottom style={smallFont}>
                   🛠️ Frontend Framework 🛠️
                </Typography>
                <Typography variant="body1" paragraph>
                    The frontend framework is built employing the React Library, Redux Toolkit, and RTK Query. These frameworks ensure effective storage and management of user data as well as facilitating a seamless data flow across the application's components.  
                </Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                <Typography variant="h4" gutterBottom style={smallFont}>
                   🌈 Styling 🌈
                </Typography>
                <Typography variant="body1" paragraph>
                    The user interface has been styled with Material UI and CSS. Interactive data visualizations are enabled by Nivo Charts, helping the user to understand and visualize financial patterns. Visual aesthetics as well as functionality is key to the user experience of this application.  
                </Typography>
                </Grid>
                
            
                <Grid container item spacing={smallSpacing}>
                    <Grid item xs={12} md={4}>
                <Typography variant="h5" gutterBottom style={smallFont}>
                    ✨Features✨
                </Typography>
                <Typography variant="body1" paragraph>
                <ul>
                    <li>User-Friendly Dashboard</li>
                    <li>Login Authentication and Authorization</li>
                    <li>Create a New User Account</li>
                    <li>Redirect to an Initial Deposit to Initalize User Account</li>
                    <li>Balance Page with Deposit and Withdrawal Functionalities</li>
                    <li>All User Data Page with an Edit User Button</li>
                    <li>Edit and Delete a User Page</li>
                    <li>Logout of User Account and Redirect to Public Landing Page</li>
                    </ul>
                    </Typography>
                </Grid>
            
                <Grid item xs={12} md={4}>
                <Typography variant="h5" gutterBottom style={smallFont}>
                    ⚡️Tech Stack⚡️
                </Typography>
                <Typography variant="body1" paragraph>
               <ul>
                    <li><strong>Backend:</strong> MongoDB, Express, Node.js (Rest API)</li>
                    <li><strong>Frontend:</strong> React, Redux, RTK Query</li>
                    <li><strong>UI Library:</strong> Material UI, CSS</li>
                    <li><strong>Data visualizations:</strong> Nivo Charts</li>
                 </ul>
                 </Typography>
                 </Grid>

                 <Grid item xs={12} md={4}>
                    <Typography variant="h5" gutterBottom style={smallFont}>
                        🚀Future Improvements/Goals🚀
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <ul>
                        <li><strong>User First Experience:</strong> Employ forgot password functionality</li>
                        <li><strong>Advanced Financial Functionalities:</strong> Include transfers and multi-currency support</li>
                        <li><strong>Budget Tracker:</strong> Create a budget tracker unique to individual users' financial needs </li>
                        <li><strong>Enhanced Security:</strong> Implement two-factor authentication (2FA) for added security</li>
                        <li><strong>Responsive App:</strong> Compatible with mobile devices of different sizes</li>
                        </ul>
                    </Typography>
                 </Grid>
                </Grid>
            
              
                <Grid item xs={12}>
                <Box mt={1} display="flex" justifyContent="center" gap={2}>
                    <Button variant="contained" sx={{
                        backgroundColor: myColors.lightPurple[400]
                    }}
                    component={Link}
                    to="/createaccount">
                        Create Account
                    </Button>
                    <Button variant="contained" sx={{
                        m1: 2,
                        backgroundColor: myColors.blueAccent[200]
                    }}
                    component={Link}
                    to="/login">
                        Log In
                    </Button>
                </Box>
                <Footer />
            </Grid>
            </Grid>
            </Box>
            </Container>
        </Box>
        )

}

export default Public