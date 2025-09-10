import axios from "axios";
import { api } from './provider/api';

const API_URL = "http://localhost:8080";

function getTeacherIdFromSession() {
  const idStr = sessionStorage.getItem("userId");
  if (!idStr) return null;
  const id = Number(idStr);
  if (isNaN(id)) return null;
  return id;
}

function authHeader() {
  const token = sessionStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function buildTeacherUrl(pathSuffix) {
  const teacherId = getTeacherIdFromSession();
  if (teacherId == null) {
    throw new Error("Usuário não autenticado ou teacherId indisponível");
  }
  return `/teachers/${teacherId}/${pathSuffix}`;
}

export const teacherService = {
  create:  (data) => api.post('/teachers', data, { headers: authHeader() }).then(res => res.data),
  getById: (id)   => api.get(`/teachers/${id}`, { headers: authHeader() }).then(res => res.data),
  update:  (id, data) => api.put(`/teachers/${id}`, data, { headers: authHeader() }).then(res => res.data),
  remove:  (id)   => api.delete(`/teachers/${id}`, { headers: authHeader() }).then(res => res.data),
  list:    ()     => api.get('/teachers', { headers: authHeader() }).then(res => res.data),

  listPublic: async () => {
    const res = await axios.get(`${API_URL}/teachers`);
    return res.data;
  },

  getStats: () => {
    const url = buildTeacherUrl("stats");
    return api.get(url, { headers: authHeader() }).then(res => res.data);
  },

  getDashboard: () => {
    const url = buildTeacherUrl("dashboard");
    return api.get(url, { headers: authHeader() }).then(res => res.data);
  },

  getProximasAulas: () => {
    const url = buildTeacherUrl("lessons/upcoming");
    return api.get(url, { headers: authHeader() }).then(res => res.data);
  },

  getMateriaisAlunos: () => {
    const url = buildTeacherUrl("materiais-alunos");
    return api.get(url, { headers: authHeader() }).then(res => res.data);
  },

  getLessonsHistory: ({ search = "" } = {}) => {
    const url = buildTeacherUrl("lessons-history");
    const config = { headers: authHeader() };
    if (search && search.trim() !== "") {
      config.params = { search: search.trim() };
    }
    return api.get(url, config).then(res => res.data);
  },
};
