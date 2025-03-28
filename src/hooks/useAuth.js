import { useState, useEffect } from "react";
import { studentService } from "../services/studentService";
import { authService } from "../services/authService";
import { apiFetch } from "../services/api";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = authService.getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await apiFetch("/auth/validate");
        setUser(response.user);
      } catch (err) {
        authService.logout(); 
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const userData = await studentService.login(credentials);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return { user, loading, error, login, logout };
};