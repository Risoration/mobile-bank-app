import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// Import Bootstrap and CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as bootstrap from 'bootstrap';
import { ThemeProvider } from '../context/themeContext';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Check your index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
        {/* <footer>Footer</footer> */}
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
