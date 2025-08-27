import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Register from './pages/Register.jsx';
import { Home } from './pages/Home.jsx';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import MainPage from './pages/MainPage.jsx';
import './index.css';
import { useState } from 'react';
import Modal from './components/Modal.jsx';
import Login from './pages/Login.jsx';

axios.defaults.withCredentials = true;

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalView, setModalView] = useState('input');

  return (
    <UserContextProvider>
      <div className='min-h-screen bg-black overflow-hidden font-thin'>
        <Navbar
          openLogin={() => {
            setModalView('login');
            setModalOpen(true);
          }}
          openRegister={() => {
            setModalView('register');
            setModalOpen(true);
          }}
        />
        <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
        {/* Routes */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/main' element={<MainPage />} />
        </Routes>

        {/* Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        >
          {modalView === 'login' && (
            <Login
              switchToRegister={() => setModalView('register')}
              setModalOpen={setModalOpen}
            />
          )}
          {modalView === 'register' && (
            <Register
              switchToLogin={() => setModalView('login')}
              setModalOpen={setModalOpen}
            />
          )}
        </Modal>
      </div>
    </UserContextProvider>
  );
}
