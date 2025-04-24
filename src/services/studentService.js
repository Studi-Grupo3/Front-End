import { api } from './provider/api';

export const studentService = {
  create:  (data) => api.post('/students', data).then(res => res.data),
  getById: (id)   => api.get(`/students/${id}`).then(res => res.data),
  update:  (id, data) => api.put(`/students/${id}`, data).then(res => res.data),
  remove:  (id)   => api.delete(`/students/${id}`).then(res => res.data),
  list:    ()     => api.get('/students').then(res => res.data),
};