import { api } from './provider/api';


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
  create: (data) =>
    api.post('/teachers', data, { headers: authHeader() }).then(res => res.data),

  getById: (id) =>
    api.get(`/teachers/${id}`, { headers: authHeader() }).then(res => res.data),

  update: (id, data) =>
    api.put(`/teachers/${id}`, data, { headers: authHeader() }).then(res => res.data),

  remove: (id) =>
    api.delete(`/teachers/${id}`, { headers: authHeader() }).then(res => res.data),

  list: () =>
    api.get('/teachers', { headers: authHeader() }).then(res => res.data),

  // ✅ Busca paginada e autenticada (usa o token armazenado)
  listPublic: async (page = 0, size = 3) => {
    const token = sessionStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const res = await api.get('/teachers', {
      params: { page, size },
      headers
    });

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

  getPendingLessons: async () => {
    try {
      const [upcoming, history] = await Promise.all([
        teacherService.getProximasAulas(),
        teacherService.getLessonsHistory()
      ]);

      const allLessons = [...(history || []), ...(upcoming || [])];

      // Remove duplicatas por ID
      const uniqueLessons = Array.from(new Map(allLessons.map(item => [item.id, item])).values());

      // Filtra apenas as agendadas (SCHEDULED)
      const pending = uniqueLessons.filter(l => l.status === 'SCHEDULED');

      // Ordena por data e hora
      return pending.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
      });
    } catch (error) {
      console.error("Erro ao buscar aulas pendentes:", error);
      throw error;
    }
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
  uploadFoto: (id, file) => {
    const formData = new FormData();
    // backend expects part name 'file' according to ProfilePhotoController
    formData.append('file', file);
    return api.post('/profile-photos', formData, {
      params: { id: Number(id), role: 'teacher' },
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data);
  },
  getProfilePhoto: (id) => {
    const token = sessionStorage.getItem('authToken') || sessionStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.get('/profile-photos', {
      params: { id: Number(id), role: 'teacher' },
      headers,
      responseType: 'blob'
    }).then(res => res.data);
  },
};
