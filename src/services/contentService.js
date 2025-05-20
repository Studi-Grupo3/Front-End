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
  }
};
