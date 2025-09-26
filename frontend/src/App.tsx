import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import { Home } from './pages/Home';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import { SettingsProvider } from '../context/settingsContext';
import { ThemeProvider } from '../context/themeContext';
import MainPage from './pages/MainPage';
import './index.css';
import Modal from './components/Modal';
import Login from './pages/Login';
import { API_CONFIG } from './config/api';

// Configure axios with the API base URL
axios.defaults.baseURL = API_CONFIG.BASE_URL;
axios.defaults.withCredentials = true;

type ModalView = 'input' | 'login' | 'register';

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalView, setModalView] = useState<ModalView>('input');

  return (
    <BrowserRouter>
      <UserContextProvider>
        <SettingsProvider>
          <ThemeProvider>
            <div className='bg-[rgb(var(--color-theme-background))] text-[color:rgb(var(--color-theme-text-primary))] max-h-screen overflow-y-auto'>
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
                <Route
                  path='/'
                  element={<Home />}
                />
                <Route
                  path='/home'
                  element={<Home />}
                />
                <Route
                  path='/main'
                  element={<MainPage />}
                />
              </Routes>

              <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
              >
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
    </BrowserRouter>
  );
};

export default App;
