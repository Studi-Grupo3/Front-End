import { api } from '../provider/api';

export const overviewDashService = {
  async fetchOverview() {
    const response = await api.get('/dashboards/overview');
    return response.data;
  },

  async getStats() {
    const data = await this.fetchOverview();
    return {
      totalRevenue: data.stats.totalRevenue,
      totalTeachers: data.stats.totalTeachers,
      totalHours: data.stats.totalHours,
      totalAppointments: data.stats.totalAppointments
    };
  },

  async getMonthlyRevenueChart() {
  const data = await this.fetchOverview();

  return {
    type: 'bar',
    title: 'Receita Mensal',
    data: data.monthlyRevenue.map(item => ({
      label: item.month, 
      value: item.revenue  
    }))
  };
},


  async getLessonsPerDayChart() {
    const data = await this.fetchOverview();
    return {
      type: 'bar',
      title: 'Aulas por Dia da Semana',
      data: data.lessonsPerDay.map(item => ({
        label: item.label,
        value: item.value
      }))
    };
  },

  async getRecentPaymentsTable() {
  const data = await this.fetchOverview();
  return data.recentPayments.map(item => {
    const date = new Date(item.date);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${
      (date.getMonth() + 1).toString().padStart(2, '0')
    }/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${
      date.getMinutes().toString().padStart(2, '0')
    }`;

    return {
      teacherName: item.professor,
      dateTime: formattedDate,
      totalValue: item.value,
      duration: item.hours,
      paymentStatus: item.status,
      actions: ''
    };
  });
}
};
