import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in by looking for a token in cookies
    const checkAuth = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/profile');
        if (data) {
          setUser(data);
        }
      } catch (error) {
        console.log(
          'No user logged in or error fetching profile:',
          error.message
        );
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
