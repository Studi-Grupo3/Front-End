import { useState, useEffect, useCallback } from "react";
import { studentService } from "../services/studentService";

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const createStudent = async (studentData) => {
    setLoading(true);
    try {
      await studentService.createStudent(studentData);
      fetchStudents();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async (id, studentData) => {
    setLoading(true);
    try {
      await studentService.updateStudent(id, studentData);
      fetchStudents();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    setLoading(true);
    try {
      await studentService.deleteStudent(id);
      fetchStudents();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      return await studentService.login(credentials);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    students,
    loading,
    error,
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    login,
  };
};