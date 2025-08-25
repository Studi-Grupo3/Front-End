import { api } from '../provider/api';
import { translatePaymentStatus, translateSubject } from '../../utils/tradutionUtils';

export const paymentDashService = {
  async fetchDashboard(month, year) {
    const response = await api.get('/dashboard/payments', {
      params: { month, year }
    });
    return response.data;
  },

  async getStats(month, year) {
    const { stats } = await this.fetchDashboard(month, year);
    return {
      totalAmount: stats.totalAmount,
      pendingAmount: stats.pendingAmount,
      realizedAmount: stats.realizedAmount,
      averageAmountPerTeacher: stats.averageAmountPerTeacher
    };
  },

  async getRecent(month, year) {
    const { recent } = await this.fetchDashboard(month, year);
    return recent.map(item => ({
      id: item.id,
      name: item.name,
      subject: translateSubject(item.subject),
      valuePerHour: item.valuePerHour,
      hours: item.hours,
      total: item.total,
      status: translatePaymentStatus(item.status)
    }));
  },

  async toggleStatus(id) {
    const response = await api.post(`/dashboard/payments/${id}/toggle`);
    return response.data;
  }
};
