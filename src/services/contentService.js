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
    formData.append("file", data.file);
    formData.append("idStudent", String(data.idStudent));

    const response = await api.post('/files', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return response.data;
}


};
