import { useState, useEffect, useCallback } from "react";
import { teacherService } from "../services/teacherService";

export const useTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await teacherService.getAllTeachers();
      setTeachers(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const createTeacher = async (teacherData) => {
    setLoading(true);
    try {
      await teacherService.createTeacher(teacherData);
      fetchTeachers();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateTeacher = async (id, teacherData) => {
    setLoading(true);
    try {
      await teacherService.updateTeacher(id, teacherData);
      fetchTeachers();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTeacher = async (id) => {
    setLoading(true);
    try {
      await teacherService.deleteTeacher(id);
      fetchTeachers();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    teachers,
    loading,
    error,
    fetchTeachers,
    createTeacher,
    updateTeacher,
    deleteTeacher,
  };
};