import { api } from './provider/api';

export const studentService = {
  create:  (data) => api.post('/students', data).then(res => res.data),
  getById: (id)   => api.get(`/students/${id}`).then(res => res.data),
  update:  (id, data) => api.put(`/students/${Number(id)}`, data).then(res => res.data),
  remove:  (id)   => api.delete(`/students/${id}`).then(res => res.data),
  list:    ()     => api.get('/students').then(res => res.data),
  uploadFoto: (id, file) => {
    const formData = new FormData();
    formData.append("foto", file);
    return api.put(`/students/upload-profile-photo/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then(res => res.data);
}};