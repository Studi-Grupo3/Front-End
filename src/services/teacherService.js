import { apiFetch } from "./api";

export const teacherService = {
  async createTeacher(teacherData) {
    return apiFetch("/teachers", {
      method: "POST",
      body: JSON.stringify(teacherData),
    });
  },

  async getTeacherById(id) {
    return apiFetch(`/teachers/${id}`);
  },

  async updateTeacher(id, teacherData) {
    return apiFetch(`/teachers/${id}`, {
      method: "PUT",
      body: JSON.stringify(teacherData),
    });
  },

  async deleteTeacher(id) {
    return apiFetch(`/teachers/${id}`, {
      method: "DELETE",
    });
  },

  async getAllTeachers() {
    return apiFetch("/teachers");
  },
};
