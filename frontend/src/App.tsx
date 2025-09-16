import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import { Home } from './pages/Home';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import { SettingsProvider } from '../context/settingsContext';
import { ThemeProvider, useTheme } from '../context/themeContext';
import MainPage from './pages/MainPage';
import './index.css';
import Modal from './components/Modal';
import Login from './pages/Login';

axios.defaults.withCredentials = true;

type ModalView = 'input' | 'login' | 'register';

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalView, setModalView] = useState<ModalView>('input');

  const { darkMode } = useTheme();
  return (
    <UserContextProvider>
      <SettingsProvider>
        <ThemeProvider>
          <div>
            <div className='p-4 bg-white dark:bg-black text-black dark:text-white'>
              Test Theme
            </div>

            <Navbar
              openLogin={() => {
                setModalView('login');
                setModalOpen(true);
              }}
            />

            <Toaster
              position='bottom-right'
              toastOptions={{ duration: 2000 }}
            />

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/main' element={<MainPage />} />
            </Routes>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
              {modalView === 'login' && (
                <Login
                  switchToRegister={() => setModalView('register')}
                  setModalOpen={setModalOpen}
                />
              )}
              {modalView === 'register' && (
                <Register switchToLogin={() => setModalView('login')} />
              )}
            </Modal>
          </div>
        </ThemeProvider>
      </SettingsProvider>
    </UserContextProvider>
  );
};

export default App;
