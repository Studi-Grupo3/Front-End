import { api } from '../provider/api';

export const paymentDashService = {
  // Busca dados brutos
  async fetchDashboard(month, year) {
    const response = await api.get('/dashboard/payments', {
      params: { month, year }
    });
    return response.data;
  },

  // Estatísticas
  async getStats(month, year) {
    const { stats } = await this.fetchDashboard(month, year);
    return {
      totalAmount: stats.totalAmount,
      pendingAmount: stats.pendingAmount,
      realizedAmount: stats.realizedAmount,
      averageAmountPerTeacher: stats.averageAmountPerTeacher
    };
  },

  // Lista recente
  async getRecent(month, year) {
    const { recent } = await this.fetchDashboard(month, year);
    return recent.map(item => ({
      id: item.id,
      name: item.name,
      subject: item.subject,
      valuePerHour: item.valuePerHour,
      hours: item.hours,
      total: item.total,
      status: item.status
    }));
  },

  // Toggle pending ↔ paid
  async toggleStatus(id) {
    // seu endpoint de toggle
    const response = await api.post(`/dashboard/payments/${id}/toggle`);
    return response.data;
  }
};
