import { apiFetch } from "./api";

export const appointmentService = {
  async createAppointment(data) {
    return apiFetch("/appointments", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getAppointmentById(id) {
    return apiFetch(`/appointments/${id}`);
  },

  async listAppointments() {
    return apiFetch("/appointments");
  },

  async updateAppointment(id, data) {
    return apiFetch(`/appointments/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteAppointment(id) {
    return apiFetch(`/appointments/${id}`, {
      method: "DELETE",
    });
  },
};