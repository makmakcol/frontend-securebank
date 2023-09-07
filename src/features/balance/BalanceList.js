import { useState, useEffect, useCallback } from "react";
import { useGetBalanceQuery, useDepositMutation, useWithdrawMutation } from "./balanceApiSlice";
import Balance from "./Balance";
import Header from "../../components/Header";
import { colors } from "../../theme";
import { Box, Card, CardContent, Typography, TextField, Button, useTheme } from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useTitle from "../../hooks/useTitle";

const BalanceList = () => {

  useTitle('ACCOUNT BALANCE')
  
  const [inputUsername, setInputUsername] = useState('');
  const [submittedUsername, setSubmittedUsername] = useState(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const[snackbarSeverity, setSnackbarSeverity] = useState('info')

  const {
    data: balance,
    isLoading,
    isError,
    isSuccess,
    error
  } = useGetBalanceQuery(submittedUsername, {
    skip: !submittedUsername, // Skip the query if submittedUsername is null
  });

  const [deposit] = useDepositMutation();
  const [withdraw] = useWithdrawMutation();

  const theme = useTheme();
  const myColors = colors(theme.palette.mode);

  const resetSubmittedUsername = useCallback(() => {
    if (submittedUsername !== null) {
      setSubmittedUsername(null);
    }
  }, [submittedUsername, setSubmittedUsername])

 
  useEffect(() => {
    if (isSuccess) {
      if (balance && balance.entities[submittedUsername]) {
        console.log("Success block running")

        setUserNotFound(false);
      } else {
        setSnackbarMessage('User not found')
        setSnackbarSeverity('error')
        setOpenSnackbar(true)
        resetSubmittedUsername()
        setUserNotFound(true);
      } 
    }}, [isSuccess, balance, submittedUsername, resetSubmittedUsername
  ])
  
    useEffect(() => {
    if (isError) {
      console.log('isError', isError)
      if (error.status === 400 && error.data.message === 'User not found') {
        setSnackbarMessage('User not found')
        setSnackbarSeverity('error')
        setOpenSnackbar(true)
        resetSubmittedUsername()
      } else {
        // Handle other types of errors here
        setSnackbarMessage("An error occurred. Please try again.");
        setSnackbarSeverity('error')
        setOpenSnackbar(true)
      }
    } 
  }, [isError, error, resetSubmittedUsername
]);

  const handleSubmit = () => {
    if (inputUsername.trim()) {
      setSubmittedUsername(inputUsername);
    }
  };
  const handleDeposit = async () => {
    if (isNaN(depositAmount) || parseFloat(depositAmount) <= 0) {
      setSnackbarMessage("Please enter a valid positive number for deposit.");
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
      return;
    }
    try {
      await deposit({ username: submittedUsername, amount: parseFloat(depositAmount) });
      setSnackbarMessage(`Deposit successful! ${submittedUsername} deposited $${depositAmount}.`);
      setSnackbarSeverity('success')
      setOpenSnackbar(true)
      setDepositAmount('');
    } catch (error) {
      console.error("Failed to deposit:", error);
      setSnackbarMessage("Error: Unable to deposit funds.");
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
    }
  };

  const handleWithdraw = async () => {
    if (isNaN(withdrawAmount) || parseFloat(withdrawAmount) <= 0) {
      setSnackbarMessage("Please enter a valid positive number for withdrawal.");
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
      return;
    }
    const response = await withdraw({ username: submittedUsername, amount: parseFloat(withdrawAmount) });
    if (response.error && response.error.status === 400) {
      setSnackbarMessage(`Insufficient funds. Unable to withdraw $${withdrawAmount}.`);
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
      return;
    }
    if (response.error) {
      console.error("Failed to withdraw:", response.error);
      setSnackbarMessage("Error: Unable to withdraw funds.");
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
      return;
    }
    setSnackbarMessage(`Withdrawal successful! ${submittedUsername} withdrew $${withdrawAmount}.`);
    setSnackbarSeverity('success')
    setOpenSnackbar(true)
    setWithdrawAmount('');
  };

  

  if (!submittedUsername) {
    return (
      <>
        <Header title="ACCOUNT BALANCE" subtitle="Check your balance and deposit/withdraw funds!" />
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Enter your username
            </Typography>
            <Box my={2}>
            <TextField 
              variant="outlined" 
              value={inputUsername} 
              onChange={e => setInputUsername(e.target.value)}
              label="Username"
              style={{ marginRight: '10px' }}
            />
            </Box>
            <Button 
              onClick={handleSubmit} 
              variant="contained" 
              sx={{
                color: myColors.lightPurple[300]
              }}
              disabled={!inputUsername.trim()}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
        <>
        <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        </>
      </>
    );
  }

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}> 
    <CircularProgress size={100} />
    </div> )
  if (isError) return <p>Error: {error?.data?.message}</p>

  if (isSuccess && userNotFound) {
    return (
      <>
        <Header title="ACCOUNT BALANCE" subtitle="Check your balance and deposit/withdraw funds!" />
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              User not found. Please enter a valid username.
            </Typography>
          </CardContent>
        </Card>
        <>
        <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        </>
      </>
    );
  } else if (isSuccess && balance && balance.entities[submittedUsername]) {
    const userBalance = balance.entities[submittedUsername]?.balance;
    return (
      <>
        <Header title="ACCOUNT BALANCE" subtitle="Check your balance and deposit/withdraw funds!" />
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              {submittedUsername}
            </Typography>
            <Box my={2} display="flex" flexDirection="column" alignItems="flex-start">
              <Typography variant="body2" color="textSecondary">
                Balance: ${userBalance}
              </Typography>
            </Box>
            <Box my={2}>
              <TextField
                label="Deposit Amount"
                value={depositAmount}
                onChange={e => setDepositAmount(e.target.value)}
              />
              <Box mt={2}>
                <Button onClick={handleDeposit} variant="contained" sx={{backgroundColor: myColors.blueAccent[300]}} disabled={!depositAmount.trim()}>
                  Deposit
                </Button>
              </Box>
            </Box>
            <Box my={2} display="flex" flexDirection="column" alignItems="flex-start"
            sx={{
              backgroundColor: myColors.lightPurple
            }}>
              <TextField
                label="Withdrawal Amount"
                value={withdrawAmount}
                onChange={e => setWithdrawAmount(e.target.value)}
                style={{ borderColor: myColors.blueAccent}}
                variant="outlined"
                InputProps={{
                    style: { color: myColors.blueAccent } }}
              />
              <Box mt={2}>
                <Button onClick={handleWithdraw} variant="contained"  sx={{ backgroundColor: myColors.pinkAccent[300], color: myColors.grey }}  disabled={!withdrawAmount.trim()}>
                  Withdraw
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Balance balanceId={submittedUsername} />
        <>
        <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        </>
      </>
     
    );
  }
};

export default BalanceList;
