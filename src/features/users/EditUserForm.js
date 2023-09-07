import { useState, useEffect } from 'react'
import { DialogActions, DialogContent, DialogContentText, useMediaQuery } from '@mui/material';
import { useUpdateUserMutation, useDeleteUserMutation } from './alldataApiSlice'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, FormControl, InputLabel, Select, IconButton, useTheme, MenuItem, Button, Dialog, DialogTitle } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { ROLES } from '../../config/roles'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import Header from '../../components/Header';
import { colors } from '../../theme';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useTitle from '../../hooks/useTitle';



const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$]).{8,24}$/;


const EditUserSchema = Yup.object().shape({
    id: Yup.string().required('User ID is Required'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().matches(EMAIL_REGEX, 'Invalid email').required('Required'),
    password: Yup.string().matches(PWD_REGEX, 'Invalid password'),
    username: Yup.string().matches(USER_REGEX, 'Invalid username').required('Required'),
    roles: Yup.array().min(1, 'Select at least one role').required('Required'),
})

const EditUserForm = ({ user }) => {
    useTitle('EDIT/DELETE USER')
    const [updateUser, {
        isLoading: isUpdatingLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isLoading: isDelLoading,
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()
    const isNonMobile = useMediaQuery("(min-width:600px)")
    const theme = useTheme();
    const myColors = colors(theme.palette.mode);
   


   const initialValues = {
    id: user.id || '',
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    password: user.password,
    roles: user.roles,
   }

   const [open, setOpen] = useState(false)
   const [openSnackbar, setOpenSnackbar] = useState(false)
   const [snackbarMessage, setSnackbarMessage] = useState('')
   const [snackbarSeverity, setSnackbarSeverity] = useState('info')
    
   useEffect(() => {
    if (isSuccess) {
        setSnackbarMessage('User successfully updated.')
        setSnackbarSeverity('success')
        setOpenSnackbar(true)
        navigate('/dash')
    }
}, [isSuccess, navigate])

useEffect(() => {
    if (isDelSuccess) {
        setSnackbarMessage('User successfully deleted.')
        setSnackbarSeverity('success')
        setOpenSnackbar(true)
        navigate('/')
    }
}, [isDelSuccess, navigate])

useEffect(() => {
    if (isError) {
        setSnackbarMessage(error?.data?.message || 'Error: Failed to update user.')
        setSnackbarSeverity('error')
        setOpenSnackbar(true)
    }
}, [isError, error])

useEffect(() => {
    if (isDelError) {
        setSnackbarMessage(delerror?.data?.message || 'Error: failed to delete user.')
        setSnackbarSeverity('error')
        setOpenSnackbar(true)
    }
}, [isDelError, delerror])

    const options = Object.values(ROLES).map(role => {
        return (
            <MenuItem
                key={role}
                value={role}

            > {role}</MenuItem>
        )
    })
    
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = async () => {
        try {
            await deleteUser(initialValues)
            setOpen(false)
        } catch (e) {
            setSnackbarMessage(e?.data?.message || 'An error occured while deleting the user.')
            setSnackbarSeverity('error')
            setOpenSnackbar(true)
        }
    }

  return (
    <Formik
    initialValues={initialValues}
    validationSchema={EditUserSchema}
    onSubmit={async (values) => {
        console.log('Submitting', values)
        try {
            await updateUser({ ...values, userId: user.userId })
        } catch (e) {
            setSnackbarMessage(e?.data?.message || 'An error occured while updating the user.')
            setSnackbarSeverity('error')
            setOpenSnackbar(true)
        }
    }}
    >
        {({ isSubmitting, touched, errors }) => (
            <Form>
                 {isUpdatingLoading && <div style={{
                    display: 'flex', justifyContent: 'center',
                    alignItems: 'center', height:'100vh'
                }}><CircularProgress size={100} /></div> }
                {isDelLoading && <div style={{
                    display: 'flex', justifyContent: 'center',
                    alignItems: 'center', height:'100vh'
                }}><CircularProgress size={100} /></div> }
                  <Header title="EDIT USER" subtitle="Edit or Delete your Account" />
                  
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
                                <Field
                                name="firstName"
                                as={TextField}
                                fullWidth
                                variant="filled"
                                type="text"
                                error={!!touched.firstName && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                                />
                                </Box>
                            <Box gridColumn="span 2">
                                <label htmlFor="lastName">Last Name</label>
                                <Field
                                name="lastName"
                                as={TextField}
                                fullWidth
                                variant="filled"
                                type="text"
                                error={!!touched.lastName && !!errors.lastName}
                                helperText={touched.lastName && errors.lastName}
                                />
                                </Box>
                            <Box gridColumn="span 2">
                                <label htmlFor="email">Email</label>
                                <Field
                                name="email"
                                as={TextField}
                                fullWidth
                                variant="filled"
                                type="text"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                />
                                </Box>
                            <Box gridColumn="span 2">
                                <label htmlFor="username">Username</label>
                                <Field
                                name="username"
                                as={TextField}
                                fullWidth
                                variant="filled"
                                type="text"
                                error={!!touched.username && !!errors.username}
                                helperText={touched.username && errors.username}
                                />
                                </Box>
                            <Box gridColumn="span 2">
                                <label htmlFor="id">User ID</label>
                                <Field
                                name="id"
                                as={TextField}
                                fullWidth
                                variant="filled"
                                type="text"
                                error={!!touched.id && !!errors.id}
                                helperText={touched.id && errors.id}
                                />
                            </Box>
                            <Box gridColumn="span 2">
                                <label htmlFor="password">Password</label>
                                <Field
                                name="password"
                                as={TextField}
                                fullWidth
                                variant="filled"
                                type="text"
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                                />
                            </Box>
                            <Box gridColumn="span 2">
                            <FormControl variant="filled">
                             <InputLabel id="roles-label">Assigned Roles</InputLabel>
                             <Field
                             as={Select}
                             labelId="roles-label"
                             id="roles"
                             name="roles"
                             multiple={true}
                             variant="filled"
                             
                             >
                              {options}
                             </Field>
                             <ErrorMessage name="roles" component="div" />
                             </FormControl>
                            </Box>
                            <Box display="flex"> 
                                 <IconButton
                                 type="submit"
                                 disabled={isSubmitting || isUpdatingLoading}
                                 >
                                 <SaveAltIcon />  
                                 </IconButton>
                            </Box>
                        <Box display="flex">
                            <IconButton  
                            type="button"
                            onClick={handleClickOpen}
                            disabled={isSubmitting || isDelLoading}>
                                <DeleteIcon />
                            </IconButton>
                            <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>{"Confirm Deletion of User Account"}</DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete this account?  This is permanent and cannot be undone.
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} sx = {{
                                    color: myColors.blueAccent[300]
                                }}>Cancel</Button>
                                <Button onClick={handleDelete}
                                sx={{
                                    color: myColors.pinkAccent[300]
                                }}
                                autoFocus>
                                Confirm</Button>
                            </DialogActions>
                            </Dialog>
                        </Box>  
                </Box>
                <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                >
                    <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Form>
        )}
    </Formik>
    
  )
}

export default EditUserForm