import { api } from './provider/api';

export const classService = {
  createClass: (data) => api.post('/classes', data).then(res => res.data)
};