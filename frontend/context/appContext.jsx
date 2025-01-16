import { createContext, useState } from 'react';

export const AppContext = createContext({});

export function AppContextProvider({ children }) {
  const [appName, setAppName] = useState('Revolve');

  return (
    <AppContext.Provider value={{ appName, setAppName }}>
      {children}
    </AppContext.Provider>
  );
}
