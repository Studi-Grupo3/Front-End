import { api } from './provider/api';

/**
 * Extrai o teacherId armazenado em sessionStorage.
 * Ajuste a chave "userId" se você usar outra.
 * Retorna null se não encontrar ou ID inválido.
 */
function getTeacherIdFromSession() {
  const idStr = sessionStorage.getItem("userId");
  if (!idStr) {
    console.error("teacherService: userId não encontrado em sessionStorage");
    return null;
  }
  const id = Number(idStr);
  if (isNaN(id)) {
    console.error("teacherService: userId em sessionStorage não é um número válido:", idStr);
    return null;
  }
  return id;
}

/**
 * Monta URL substituindo teacherId, ou rejeita se não tiver ID.
 */
function buildTeacherUrl(pathSuffix) {
  const teacherId = getTeacherIdFromSession();
  if (teacherId == null) {
    throw new Error("Usuário não autenticado ou teacherId indisponível");
  }
  // Garante que haja barra separando se necessário
  // Por ex: pathSuffix = "stats" -> "/teacher/{id}/stats"
  return `/teachers/${teacherId}/${pathSuffix}`;
}

export const teacherService = {
  create:  (data) => api.post('/teachers', data).then(res => res.data),
  getById: (id)   => api.get(`/teachers/${id}`).then(res => res.data),
  update:  (id, data) => api.put(`/teachers/${id}`, data).then(res => res.data),
  remove:  (id)   => api.delete(`/teachers/${id}`).then(res => res.data),
  list:    ()     => api.get('/teachers').then(res => res.data),

  getStats: () => {
    try {
      const url = buildTeacherUrl("stats");
      return api.get(url).then(res => res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  },

  getDashboard: () => {
    try {
      const url = buildTeacherUrl("dashboard");
      return api.get(url).then(res => res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  },

  getProximasAulas: () => {
    try {
      const url = buildTeacherUrl("lessons/upcoming");
      return api.get(url).then(res => res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  },

  getMateriaisAlunos: () => {
    try {
      const url = buildTeacherUrl("materiais-alunos");
      return api.get(url).then(res => res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  },

  getLessonsHistory: ({ search = "" } = {}) => {
    try {
      const url = buildTeacherUrl("lessons-history");
      const config = {};
      if (search && search.trim() !== "") {
        config.params = { search: search.trim() };
      }
      return api.get(url, config).then(res => res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  },

  // getAvailability: async (id) => {
  //   const { data } = await api.get(`/teachers/${id}/availability`);
  //   return data;
  // },

  // saveAvailability: async (id, availability) => {
  //   return api.post(`/teachers/${id}/availability`, availability);
  // }
};
