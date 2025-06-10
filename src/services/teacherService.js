import { api } from './provider/api';

export const teacherService = {
  create:  (data) => api.post('/teachers', data).then(res => res.data),
  getById: (id)   => api.get(`/teachers/${id}`).then(res => res.data),
  update:  (id, data) => api.put(`/teachers/${id}`, data).then(res => res.data),
  remove:  (id)   => api.delete(`/teachers/${id}`).then(res => res.data),
  list:    ()     => api.get('/teachers').then(res => res.data),

  getStats: () => api.get("/teacher/stats").then(res => res.data),
  getProximasAulas: () => api.get("/teacher/proximas-aulas").then(res => res.data),
  getMateriaisAlunos: () => api.get("/teacher/materiais-alunos").then(res => res.data),
  getLessonsHistory: ({ search = "" } = {}) =>
    api
      .get("/teacher/lessons-history", {
        params: search ? { search } : {},
      })
      .then(res => res.data), 
};