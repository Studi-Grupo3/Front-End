import { api } from './provider/api';

export const authService = {
  loginStudent: async (credentials) => {
    const response = await api.post('/students/login', credentials).then(res => res.data);
    if (response.token) localStorage.setItem('authToken', response.token);
    return response;
  },
  loginTeacher: async (credentials) => {
    const response = await api.post('/teachers/login', credentials).then(res => res.data);
    if (response.token) localStorage.setItem('authToken', response.token);
    return response;
  },
  logout: () => {
    localStorage.removeItem('authToken');
    return api.post('/logout').then(res => res.data);
  },
  getToken: () => localStorage.getItem('authToken'),
};