import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom';
import usePersist from '../../hooks/usePersist'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../../components/Header'
import { Box, TextField, Button, useTheme, FormControlLabel, Grid, Container, Checkbox} from '@mui/material'
import * as yup from "yup"
import { Formik, Form, Field } from "formik"
import { colors } from '../../theme';
import useTitle from '../../hooks/useTitle';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$]).{8,24}$/;

const loginSchema =  yup.object().shape({
username: yup.string().matches(USER_REGEX, "Error: invalid username.").required("required"),
password: yup.string().matches(PWD_REGEX, "Error: invalid password.").required("required")
})


const Login = () => {

    useTitle('LOGIN')
   
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const theme = useTheme();
    const myColors = colors(theme.palette.mode);
   
    const initialValues={
        username: "",
        password: ""
    }

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [username, password])

    

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return (<div style={{
        display: 'flex', justifyContent: 'center',
        alignItems: 'center', height:'100vh'
    }}><CircularProgress size={100} /></div> )

    return (
        <>
        <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
                try {
                    const { accessToken } = await login(values).unwrap()
                    dispatch(setCredentials({ accessToken }))
                    setUsername('')
                    setPassword('')
                    navigate('/dash')
                } catch (err) {
                    if (!err.status) {
                        setErrMsg('No Server Response')
                    } else if (err.status === 400) {
                        setErrMsg('Missing Username or Password')
                    } else if (err.status === 401) {
                        setErrMsg('Unauthorized')
                    } else {
                        setErrMsg(err.data?.message)
                    }
                    errRef.current.focus()
                }
                setSubmitting(false)
        }}
        >
            {({ isValid, touched, errors }) => (
                  <Container component="main" maxWidth="sm">
                    <Box m="20px">
                     <Box display="flex" 
                          justifyContent="center" 
                          alignItems="center">
                  <Header title="USER LOGIN" subtitle="Login to Access Account" />
                    <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                    </Box>
                    </Box>
                  <Form>
                    <Box sx={{
                        boxShadow: 3,
                        borderRadius: 2,
                        px: 4,
                        py: 6,
                        marginTop: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: myColors.grey[900]
                    }}>
                        <Box component="form" noValidate sx={{ mt: 1 }}
                        >
                        <Field name="username">
                            {({ field }) => (
                                <TextField
                                margin="normal"
                                fullWidth
                                type="text"
                                id="username"
                                label="Username"
                                ref={userRef}
                                value={username}
                                onChange={handleUserInput}
                                autoFocus
                                variant="outlined"
                                autoComplete="off"
                                required
                                {...field}
                                error={Boolean(errors.username && touched.username)}
                                helperText={errors.username && touched.username ? errors.username : null}
                                
                                />
                            )} 
                        </Field>
                        <Field name="password">
                            {({ field }) => (
                                <TextField
                                margin="normal"
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                onChange={handlePwdInput}
                                value={password}
                                variant="outlined"
                                required
                                autoComplete="off"
                                {...field}
                                error={Boolean(errors.password && touched.password)}
                                helperText={errors.password && touched.password ? errors.password : null}
                                 />
                            )}
                        </Field>
                        </Box>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item>
                            <FormControlLabel
                            control={<Checkbox value="persist"
                            onChange={handleToggle}
                            checked={persist} sx={{
                                color: myColors.pinkAccent[300]
                            }} />} label="Remember me"
                            
                            />
                            </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained"
                        sx={{
                            backgroundColor: myColors.blueAccent[200],
                            mt: 3,
                            mb:2
                        }}
                        disabled={!isValid}>
                            Login
                        </Button>
                        </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs>
                            <RouterLink to="/createaccount">Create an Account!</RouterLink>
                            </Grid>
                        </Grid>
                    </Box>
                  </Form>
                  </Container>
            )}
        </Formik>
        </>
    )

}

export default Login