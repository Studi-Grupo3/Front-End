import { api } from './provider/api'; 

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auths/login', credentials).then(res => res.data);
    if (response.token) {
      sessionStorage.setItem('authToken', response.token); 
      sessionStorage.setItem('userId', response.id);       
      sessionStorage.setItem('userRole', response.role);  
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

  forgotPassword: (data) => api.post('/auths/forgot-password', data),
  verifyCode: (data) => api.post('/auths/verify-code', data),

  resetPassword: async ({ email, newPassword }) => {
    return api.patch('/students/reset-password', { email, newPassword });
  }
};
