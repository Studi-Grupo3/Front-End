import { api } from '../provider/api';
import { translateMonth, translateWeekday, translatePaymentStatus, translateSubject } from '../../utils/tradutionUtils';

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
        label: translateMonth(item.month),
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
        label: translateWeekday(item.label),
        value: item.value
      }))
    };
  },

  async getRecentPaymentsTable() {
  const data = await this.fetchOverview();
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  console.log(data.recentPayments);
  return data.recentPayments.map(item => {
    const hourlyRate = item.hourlyRate; 
    const duration = item.durationClass;

    const totalValue = hourlyRate * duration;
    return {
      teacherName: item.teacher,         
      subject: translateSubject(item.subject),               
      hourlyRate: formatter.format(hourlyRate),
      duration,                         
      totalValue: formatter.format(totalValue),
      paymentStatus: translatePaymentStatus(item.status),
      actions: ''
    };
  });
}

};
