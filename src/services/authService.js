import { api } from './provider/api';

export const authService = {
  login: async (credentials) => {
    const response = await api
      .post('/auths/login', credentials)
      .then(res => res.data);

    if (response.token) {
      // Store authentication data in sessionStorage
      sessionStorage.setItem('authToken', response.token);
      sessionStorage.setItem('userId', response.id);
      sessionStorage.setItem('userRole', response.role);
      // Store user email as requested
      sessionStorage.setItem('userEmail', response.email);
    }

    return response;
  },

  logout: () => {
    // Remove all authentication-related data
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userEmail');
  },

  getToken: () => sessionStorage.getItem('authToken'),
  getUserId: () => sessionStorage.getItem('userId'),
  getUserRole: () => sessionStorage.getItem('userRole'),
  getUserEmail: () => sessionStorage.getItem('userEmail'),

  forgotPassword: (data) => api.post('/auths/forgot-password', data),
  verifyCode: (data) => api.post('/auths/verify-code', data),

  resetPassword: async ({ email, newPassword }) => {
    return api.patch('/students/reset-password', { email, newPassword });
  }
};
