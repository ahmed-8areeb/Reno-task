import Dashboard from './pages/Dashboard';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import WelcomeScreen from './pages/Welcome';
import Withdraw from './pages/Withdraw';
import BankSystems from './pages/BankSystems';
import Groups from './pages/Groups';
import Profiles from './pages/Profiles';
import PersistentDrawerLeft from './components/PersistentDrawerLeft';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route element={<PersistentDrawerLeft />}>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/atmsetting" >
              <Route index element={<Navigate replace to='withdraw' />} />
              <Route path="withdraw" element={<Withdraw />} />
            </Route>
            <Route path="/businesssetup" >
              <Route index element={<Navigate replace to='banksystems' />} />
              <Route path="banksystems" element={<BankSystems />} />
            </Route>
            <Route path="/usermanagement">
              <Route index element={<Navigate replace to='users' />} />
              <Route path="users" element={<Dashboard />} />
              <Route path="groups" element={<Groups />} />
              <Route path="profiles" element={<Profiles />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  )
}

export default App
