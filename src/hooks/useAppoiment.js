import { useState, useEffect, useCallback } from "react";
import { appointmentService } from "../services/appointmentService";

export const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await appointmentService.listAppointments();
      setAppointments(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const createAppointment = async (appointmentData) => {
    setLoading(true);
    try {
      await appointmentService.createAppointment(appointmentData);
      fetchAppointments();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointment = async (id, appointmentData) => {
    setLoading(true);
    try {
      await appointmentService.updateAppointment(id, appointmentData);
      fetchAppointments();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (id) => {
    setLoading(true);
    try {
      await appointmentService.deleteAppointment(id);
      fetchAppointments();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    appointments,
    loading,
    error,
    fetchAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  };
};
