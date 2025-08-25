import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    const userId = sessionStorage.getItem('userId');
    const role = sessionStorage.getItem('userRole');

    if (token && userId && role) {
      setUser({ token, userId, role });
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('authToken', userData.token);
    sessionStorage.setItem('userId', userData.userId);
    sessionStorage.setItem('userRole', userData.role);
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null); // Isso aqui que faz o logout ser reativo
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
