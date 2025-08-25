import { api } from './provider/api';

export const fileService = {
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/files', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(res => res.data);
  },
  getInfo: (id) => api.get(`/files/${id}/info`).then(res => res.data),
  download: async (id) => {
    const response = await api.get(`/files/${id}`, { responseType: 'blob' });
    const blob = await response.data;
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const cd = response.headers['content-disposition'];
    const match = cd && cd.match(/filename="(.+)"/);
    a.download = (match && match[1]) || 'downloaded-file';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  },
};