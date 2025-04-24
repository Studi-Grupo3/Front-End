import { useState, useEffect } from "react";
import { studentService } from "../services/studentService";
import { authService } from "../services/authService";
import { useApi } from "./useApi"; 

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const {
    data: validatedUser,
    loading,
    error: validationError,
  } = useApi(
    () => {
      const token = authService.getToken();
      if (!token) throw new Error("No token");
      return authService.validateToken();
    },
    [],
    true
  );

  useEffect(() => {
    if (validatedUser?.user) {
      setUser(validatedUser.user);
    } else if (validationError) {
      authService.logout();
      setUser(null);
    }
  }, [validatedUser, validationError]);

  const login = async (credentials) => {
    try {
      const { data: userData } = await studentService.login(credentials);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return { user, loading, error, login, logout };
};
