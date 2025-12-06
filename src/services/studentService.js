import { api } from './provider/api';

export const studentService = {
  create: (data) => api.post('/students', data).then(res => res.data),
  getById: (id) => api.get(`/students/${id}`).then(res => res.data),
  update: (id, data) => api.put(`/students/${Number(id)}`, data).then(res => res.data),
  remove: (id) => api.delete(`/students/${id}`).then(res => res.data),
  list: () => api.get('/students').then(res => res.data),

  uploadFoto: (id, file) => {
    const formData = new FormData();
    // backend expects part name 'file' according to ProfilePhotoController
    formData.append('file', file);
    return api.put('/profile-photos', formData, {
      params: { id: Number(id), role: 'student' },
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data);
  }
  ,
  getProfilePhoto: (id) => {
    const token = sessionStorage.getItem('authToken') || sessionStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.get('/profile-photos', {
      params: { id: Number(id), role: 'student' },
      headers,
      responseType: 'blob'
    }).then(res => res.data);
  }
};