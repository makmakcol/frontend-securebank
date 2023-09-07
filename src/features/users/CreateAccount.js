import { useEffect } from "react"
import { useAddNewUserMutation } from "./alldataApiSlice"
import { useNavigate } from "react-router-dom"
import { ROLES } from "../../config/roles"
import { Box, Button, TextField, InputLabel, Select, MenuItem, FormControl, useTheme} from "@mui/material"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery"
import Header from "../../components/Header"
import CircularProgress from "@mui/material/CircularProgress"
import { colors } from '../../theme';
import useTitle from "../../hooks/useTitle"




const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


const userSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().matches(EMAIL_REGEX, "Error: invalid email.").required("required"),
    username: yup.string().matches(USER_REGEX, "Error: invalid username.").required("required"),
    password: yup.string().matches(PWD_REGEX, "Error: invalid password.").required("required"),
    roles: yup.array().min(1, "At least one role is required").required("required"),
})



const CreateAccount = () => {

    useTitle('CREATE ACCOUNT')

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()
    
    const isNonMobile = useMediaQuery("(min-width:600px)")
    const theme = useTheme();
    const myColors = colors(theme.palette.mode);


    useEffect(() => {
        if (isSuccess) {
            navigate('/balance/initial-deposit')
        }
    }, [isSuccess, navigate])

    const options = Object.values(ROLES).map(role => (
            <MenuItem
            key={role}
            value={role}
            > {role}</MenuItem>   
    ))

    

        return (
            <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                username: "",
                password: "",
                roles: ["User"],
            }}
                validationSchema={userSchema}
                onSubmit={async (values) => {
                    await addNewUser(values);
                }}
                >
                {({ touched, errors, values, handleChange, handleBlur, isSubmitting }) => (
                    <Form>
                 {isLoading && <div style={{
                    display: 'flex', justifyContent: 'center',
                    alignItems: 'center', height:'100vh'
                 }}><CircularProgress size={100} /></div> }

                        <Header title="CREATE USER" subtitle="Create New User Account" />
                        {isError && <p>{error?.data?.message || 'An error occurred'}</p>}
                        <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4"},
                        }}
                        >
                            <Box gridColumn="span 2">
                                <label htmlFor="firstName">First Name</label>
                                <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={!!touched.firstName && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                                />
                            </Box>
                            <Box gridColumn="span 2">
                                <label htmlFor="lastName">Last Name</label>
                                <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                error={!!touched.lastName && !!errors.lastName}
                                helperText={touched.lastName && errors.lastName}
                                />
                            </Box>
                            <Box gridColumn="span 2">
                                <label htmlFor="email">Email</label>
                                <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                />
                            </Box>
                            <Box gridColumn="span 2">
                                <label htmlFor="username">Username</label>
                                <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.username}
                                name="username"
                                error={!!touched.username && !!errors.username}
                                helperText={touched.username && errors.username}
                                />
                            </Box>
                            <Box gridColumn="span 2">
                                <label htmlFor="password">Password</label>
                                <TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                                />
                            </Box>
                            </Box>
                            <Box gridColumn="span 2">
                            <FormControl variant="filled">
                             <InputLabel id="roles-label" style={{ color: 'whitesmoke'}}>Assigned Roles</InputLabel>
                             <Field
                             as={Select}
                             labelId="roles-label"
                             id="roles"
                             name="roles"
                             multiple={true}
                             variant="filled"
                             style={{ height: '40px', color: 'whitesmoke' }}
                             >
                              {options}
                             </Field>
                             <ErrorMessage name="roles" component="div" />
                             </FormControl>
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button 
                                 type="submit" 
                                 sx={{
                                    color: myColors.blueAccent[900]
                                 }}
                                 variant="contained"
                                 disabled={isSubmitting || isLoading}>  
                                 Create Account 
                                </Button>
                            </Box>
                    </Form>
                )}
                </Formik>
        )
}
    
export default CreateAccount