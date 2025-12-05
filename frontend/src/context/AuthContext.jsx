import { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get('/auth/me');
        if (data?.data) {
          const normalizedUser = {
            ...data.data,
            loginMethod: data.data.provider === 'GOOGLE' ? 'google' : 'email',
          };
          setUser(normalizedUser);
          setIsAuthenticated(true);
        }
      } catch (err) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      const token = data?.data?.token;
      const userData = data?.data?.user;

      if (!token || !userData) throw new Error('Invalid login response');

      const normalizedUser = {
        ...userData,
        loginMethod: userData.provider === 'GOOGLE' ? 'google' : 'email',
      };

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(normalizedUser));

      setUser(normalizedUser);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.response?.data?.error || 'Login failed';
      return { success: false, message };
    }
  };

  const register = async (userData) => {
    try {
      const { data } = await api.post('/auth/register', userData);
      const token = data?.data?.token;
      const newUser = data?.data?.user;

      if (!token || !newUser) throw new Error('Invalid registration response');

      const normalizedUser = {
        ...newUser,
        loginMethod: newUser.provider === 'GOOGLE' ? 'google' : 'email',
      };

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(normalizedUser));

      setUser(normalizedUser);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.response?.data?.error || 'Registration failed';
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
