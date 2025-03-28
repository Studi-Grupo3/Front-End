import { apiFetch } from "./api";

export const studentService = {
  async createStudent(studentData) {
    return apiFetch("/students", {
      method: "POST",
      body: JSON.stringify(studentData),
    });
  },

  async getStudentById(id) {
    return apiFetch(`/students/${id}`);
  },

  async updateStudent(id, studentData) {
    return apiFetch(`/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(studentData),
    });
  },

  async deleteStudent(id) {
    return apiFetch(`/students/${id}`, {
      method: "DELETE",
    });
  },

  async getAllStudents() {
    return apiFetch("/students");
  },
  
};
