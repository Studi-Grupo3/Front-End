import { api } from './provider/api';

export const teacherService = {
  create:  (data) => api.post('/teachers', data).then(res => res.data),
  getById: (id)   => api.get(`/teachers/${id}`).then(res => res.data),
  update:  (id, data) => api.put(`/teachers/${id}`, data).then(res => res.data),
  remove:  (id)   => api.delete(`/teachers/${id}`).then(res => res.data),
  list:    ()     => api.get('/teachers').then(res => res.data),
};