import { api } from '../provider/api';
import { translatePaymentStatus, translateSubject } from '../../utils/tradutionUtils';

export const teacherDashService = {
  async fetchDashboard() {
    const response = await api.get('/dashboards');
    return response.data;
  },

  async getStats() {
    const data = await this.fetchDashboard();
    return {
      totalTeachers: data.stats.totalProfessores,
      activeTeachers: Array.isArray(data.teacherTableValues) ? data.teacherTableValues.length : 0,
      totalHoursWorked: data.stats.totalHorasTrabalhadas,
      averageHourlyRate: data.stats.valorHoraMedio,
      averageMonthlyHours: data.stats.mediaHorasMes
    };
  },

  async getCharts() {
    const data = await this.fetchDashboard();
    return [
      {
        type: 'bar',
        title: 'Top 5 Professores (Horas Trabalhadas)',
        data: (data.topTeachers || []).map(p => ({
          label: p.label,
          value: p.value
        }))
      },
      {
        type: 'pie',
        title: 'Distribuição por Disciplina',
        data: (data.subsjectChartValues || []).map(d => ({
          label: translateSubject(d.label),
          value: d.percentage
        }))
      }
    ];
  },

  async getPayments() {
    const data = await this.fetchDashboard();
    return (data.teacherTableValues || []).map(item => ({
      name: item.name,
      subject: translateSubject(item.subject),
      hours: item.hoursWorked,
      value: item.hourlyRate,
      status: translatePaymentStatus(item.status),
      actions: '…'
    }));
  }
};
