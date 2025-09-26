import axios from 'axios';
import React from 'react';
import { createContext, useState, useEffect } from 'react';
import { API_CONFIG } from '../src/config/api.ts';

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: false,
});

export type User = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  subscriptionTier: 'free' | 'premium';
};

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is logged in by looking for a token in cookies
    async function checkAuth() {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${API_CONFIG.ENDPOINTS.AUTH}/profile`
        );
        if (data) {
          const normalized = {
            id: data.id || data._id,
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            subscriptionTier: 'free',
          } as User;
          setUser(normalized);
          console.log('User authenticated:', normalized);
        } else {
          setUser(null);
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
    }

    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
