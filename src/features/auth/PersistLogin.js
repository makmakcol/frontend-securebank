import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import CircularProgress  from "@mui/material/CircularProgress";


const PersistLogin = () => {

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {

        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    // const response = 
                    await refresh()
                    // const { accessToken } = response.data
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }

            if (!token && persist) verifyRefreshToken()
        }

        return () => effectRan.current = true



    }, [])
  
    let content
    if (!persist) { // persist: no
        console.log('no persist')
        content = <Outlet />

    } else if (isLoading) { // persist: yes, token: no
        console.log('Loading')
        content = (<div style={{
            display: 'flex', justifyContent: 'center',
            alignItems: 'center', height:'100vh'
        }}><CircularProgress size={100} /></div> )

    } else if (isError) { // persist: yes, token: no
        console.log('Error')
        content = (
            <p className='errmsg'>
                {`${error?.data?.message} - `}
                <Link to="/login">Please login again</Link>
            </p>
        )
    } else if (isSuccess && trueSuccess) { // persist: yes, token: yes
        console.log('Success')
        content = <Outlet />
    } else if (token && isUninitialized) { // persist: yes, token: yes
        console.log('token and uninitialized')
        console.log(isUninitialized)
        content = <Outlet />
    }
    return content
}

export default PersistLogin

