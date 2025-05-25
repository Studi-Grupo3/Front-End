import { api } from './provider/api'; 

export const contentService = {
  uploadFileWithStudentId: async (file, studentId) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('studentId', studentId);

    const response = await api.post('/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  },

  createClass: async (data) => {
    const formData = new FormData();

    formData.append('phase', data.phase);
    formData.append('subject', data.subject);
    formData.append('duration', data.duration);

    data.materials.forEach((mat, index) => {
      formData.append(`materials[${index}][name]`, mat.name);
      formData.append(`materials[${index}][file]`, mat.file);
    });

    const response = await api.post('/classes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  }
};
