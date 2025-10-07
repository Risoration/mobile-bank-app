import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import { Home } from './pages/Home';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import { SettingsProvider } from '../context/settingsContext';
import { ThemeProvider } from '../context/themeContext';
import MainPage from './pages/MainPage';
import './index.css';
import Modal from './components/Modal';
import Login from './pages/Login';
import Pricing from './pages/Pricing';

type ModalView = 'input' | 'login' | 'register';

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalView, setModalView] = useState<ModalView>('input');

  return (
    <UserContextProvider>
      <SettingsProvider>
        <ThemeProvider>
          <div className='bg-[rgb(var(--color-theme-background))] text-[color:rgb(var(--color-theme-text-primary))] min-h-screen overflow-y-auto'>
            <Navbar
              openLogin={() => {
                setModalView('login');
                setModalOpen(true);
              }}
            />

            <Toaster
              position='top-center'
              toastOptions={{
                duration: 2000,
                style: {
                  fontSize: '14px',
                  padding: '12px 16px',
                },
              }}
            />

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/main' element={<MainPage />} />
              <Route path='/pricing' element={<Pricing />} />
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
