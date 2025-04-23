import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_ENDERECO_API || 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data, statusText } = error.response;
      const defaultMessages = {
        400: 'Requisição inválida',
        401: 'Autenticação necessária',
        403: 'Acesso proibido',
        404: 'Recurso não encontrado',
        409: 'Conflito de dados',
        500: 'Erro interno do servidor',
      };
      const message = (data && data.message) || defaultMessages[status] || `Erro ${status}: ${statusText}`;
      return Promise.reject(new Error(message));
    }
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Requisição cancelada por timeout'));
    }
    return Promise.reject(new Error(error.message));
  }
);