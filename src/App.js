
import { Route, Routes, useLocation } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./features/global/Navbar";
import MySidebar from "./features/global/MySidebar";
import Public from "./components/Public";
import Dashboard from "./features/dashboard/Dashboard";
import Login from "./features/auth/Login";
import CreateAccount from "./features/users/CreateAccount";
import BalanceList from "./features/balance/BalanceList";
import AllDataList from "./features/users/AllDataList";
import EditUser from "./features/users/EditUser";
import InitialDeposit from "./features/balance/InitialDeposit";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import Bar from "./features/bar";
import Pie from "./features/pie";
import Line from "./features/line";
import Geography from "./features/geo";
import useTitle from "./hooks/useTitle";

function App() {
  useTitle('SECURE BANK')
  const [theme, colorMode] = useMode();
  const location = useLocation()
 
const excludedPaths = ["/", "/login", "/createaccount"]
//const hasSidebar = !excludedPaths.includes(location.pathname);
const hideNavbar = excludedPaths.includes(location.pathname);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        { !hideNavbar && <Navbar /> } 
  
        {location.pathname === '/dash' && <MySidebar />}


        <main className={location.pathname === '/dash' ? 'content with-sidebar' : location.pathname === '/' || location.pathname === '/login' ? 'center-content' : 'content without-sidebar'}>

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Public />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createaccount" element={<CreateAccount />} />

            {/* Protected Routes */}
            <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/bar/:username" element={<Bar />} />
            <Route path="/pie/:username" element={<Pie />} />
            <Route path="/line" element={<Line />} />
            <Route path="/geo" element={<Geography />} />
          

          <Route path="users">
            <Route index element={<AllDataList />} />
            <Route path=":id" element={<EditUser />} />
            </Route>


            <Route path="balance">
              <Route index element={<BalanceList />} />
              <Route path="initial-deposit" element={<InitialDeposit />} />
            </Route>

            </Route>
          </Route>
          </Route>
          </Routes>
  
        </main>
   
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}


export default App;
