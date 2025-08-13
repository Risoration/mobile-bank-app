import { Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Navbar from './components/Navbar.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import Dashboard from './pages/Dashboard.jsx';
import { createContext, useState } from 'react';
axios.defaults.withCredentials = true;

export const LoginContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
      <UserContextProvider>
        <Box minH={'100vh'} className='app'>
          <Navbar />
          <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </Box>
      </UserContextProvider>{' '}
    </LoginContext.Provider>
  );
}
export default App;
