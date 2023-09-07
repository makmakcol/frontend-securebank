import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Card, CardContent, TextField, Button, Typography, useTheme} from "@mui/material"
import { useInitialDepositMutation, useGetBalanceQuery } from "./balanceApiSlice"
import CircularProgress from "@mui/material/CircularProgress"
import Header from "../../components/Header"
import { colors } from "../../theme"
import useTitle from "../../hooks/useTitle"



const InitialDeposit = () => {

    useTitle('INITIAL DEPOSIT')
    
    const [amount, setAmount] = useState(0)
    const [username, setUsername] = useState('')

    const { data: balance, refetch } = useGetBalanceQuery(username)

    const [initialDeposit, {
        isLoading,
        isSuccess,
        isError,
        error
    } ]= useInitialDepositMutation()


   
    const navigate = useNavigate()
    const theme = useTheme();
    const myColors = colors(theme.palette.mode);
 
    useEffect(() => {
        if (isSuccess) {
            refetch()
        }
    }, [isSuccess, refetch, username])

    const handleDeposit = async () => {
        if (amount >= 25) {
            try {
                await initialDeposit({ amount, username })
                navigate('/login')
            } catch (err) {
                console.error("Error making initial deposit", err)
            }
           
        }
        
    }
return (
    <>
    <Header title="INITIAL DEPOSIT" subtitle="Initialize Your Account" />
        <Card>
            <CardContent>
            <Typography variant="h5" component="div">
              Please make an initial deposit of at least $25 to proceed
            </Typography>
                {isLoading ? (
                     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                     <CircularProgress size={100} /></div>
                ) : (
                    <>
                    <Box my={2}>
                        <TextField
                        label="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        />
                    </Box>
                     <Box my={2}>
                    <TextField
                    label="Initial Deposit"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    />
                      </Box>
                    <Button 
                    onClick={handleDeposit} 
                    variant="contained" 
                    style={{
                        backgroundColor: myColors.blueAccent[300]
                    }}
                    disabled={amount < 25}>
                        Make Initial Deposit 
                    </Button>
                    </>
                )}
                {isError && <div>Error: {error?.message || 'An error occurred.'}</div>}
                {isSuccess && <div>Initial deposit successful! Your new balance is ${balance.entities[username]?.balance}</div> }

            </CardContent>
        </Card>
    </>
)
}

export default InitialDeposit
