import { api } from './provider/api'; 

export const contentService = {
  uploadFileWithStudentId: async (file, studentId) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('studentId', String(studentId));

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

    data.materials.forEach((mat) => {
        formData.append('materials', mat.file);
        formData.append('materialsNames', mat.name); 
    });

    const response = await api.post('/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
}

};
