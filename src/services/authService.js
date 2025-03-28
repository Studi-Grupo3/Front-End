import { apiFetch } from "./api";

export const authService = {
  async loginAsStudent(credentials) {
    const response = await apiFetch("/students/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (response.token) {
      localStorage.setItem("authToken", response.token);
    }

    return response;
  },

  async loginAsTeacher(credentials) {
    const response = await apiFetch("/teachers/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (response.token) {
      localStorage.setItem("authToken", response.token);
    }

    return response;
  },

  async logout() {
    localStorage.removeItem("authToken");
    return apiFetch("/logout", {
      method: "POST",
    });
  },

  getToken() {
    return localStorage.getItem("authToken");
  },
};
