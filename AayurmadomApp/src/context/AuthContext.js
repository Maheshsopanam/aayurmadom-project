import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
  try {
    const storedUser = await AsyncStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  } catch (error) {
    console.log('Auth check error:', error);
  } finally {
    setLoadingAuth(false);
  }
};

  const login = async userData => {
  await AsyncStorage.setItem('user', JSON.stringify(userData));
  setUser(userData);
  setIsLoggedIn(true);
};

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loadingAuth,
        user,
        userEmail: user?.email || '',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};