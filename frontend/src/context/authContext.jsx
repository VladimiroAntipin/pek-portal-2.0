import React, { createContext, useContext, useEffect, useState } from 'react';
import authService from '../api/auth';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
    return storedIsAuthenticated === 'true';
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  useEffect(() => {
    let isMounted = true;

    const loadUserFromStorage = async () => {
      try {
        const storedUser = authService.getCurrentUser();

        if (storedUser?.accessToken && isMounted) {
          try {
            await axios.get(`${process.env.REACT_APP_API_URL}/users/me`, {
              headers: { Authorization: `Bearer ${storedUser.accessToken}` }
            });

            if (isMounted) {
              setUser(storedUser);
              setIsAuthenticated(true);
            }
          } catch (err) {
            if (err.response?.status === 401 && storedUser.refreshToken) {
              try {
                const { accessToken, refreshToken: newRefreshToken } =
                  await authService.refreshToken(storedUser.refreshToken);

                const updatedUser = {
                  ...storedUser,
                  accessToken,
                  refreshToken: newRefreshToken || storedUser.refreshToken
                };

                localStorage.setItem('user', JSON.stringify(updatedUser));

                if (isMounted) {
                  setUser(updatedUser);
                  setIsAuthenticated(true);
                }
              } catch (refreshError) {
                console.error("Refresh token failed:", refreshError);
                if (isMounted) logout();
              }
            } else {
              console.error("Token validation failed:", err);
              if (isMounted) logout();
            }
          }
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      if (isLoading) setIsLoading(false);
    }, 5000);

    loadUserFromStorage();

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await authService.login(email, password);
      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (user?.refreshToken) {
        await authService.logout(user.refreshToken);
      }
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);