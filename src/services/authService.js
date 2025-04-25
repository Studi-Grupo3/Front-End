import { api } from './provider/api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auths/login', credentials).then(res => res.data);
    if (response.token) {
      sessionStorage.setItem('authToken', response.token); // Armazena o token JWT
      sessionStorage.setItem('userId', response.id);       // Armazena o ID do usuário
      sessionStorage.setItem('userRole', response.role);   // Armazena a role do usuário
    }
    return response;
  },

  logout: () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userRole');
    return api.post('/logout').then(res => res.data);
  },

  getToken: () => sessionStorage.getItem('authToken'),
  getUserId: () => sessionStorage.getItem('userId'),
  getUserRole: () => sessionStorage.getItem('userRole'),
};
