import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userEmail');

      if (storedEmail) {
        setIsLoggedIn(true);
        setUserEmail(storedEmail);
      }
    } catch (error) {
      console.log('Auth check error:', error);
    } finally {
      setLoadingAuth(false);
    }
  };

  const login = async email => {
    await AsyncStorage.setItem('userEmail', email);
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userEmail');
    setUserEmail('');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loadingAuth,
        userEmail,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};