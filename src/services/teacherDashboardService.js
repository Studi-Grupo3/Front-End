import { api } from "./provider/api";

export const teacherDashboardService = {
  getStats: () => api.get("/teacher/dashboard/stats").then(res => res.data),
  getProximasAulas: () => api.get("/teacher/dashboard/proximas-aulas").then(res => res.data),
  getMateriaisAlunos: () => api.get("/teacher/dashboard/materiais-alunos").then(res => res.data),
  getLessonsHistory: ({ search = "" } = {}) =>
    api
      .get("/teacher/dashboard/lessons-history", {
        params: search ? { search } : {},
      })
      .then(res => res.data),
};