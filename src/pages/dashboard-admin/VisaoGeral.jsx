import { useEffect, useState } from 'react';
import { Sidebar } from '../../components/dashboard-admin/Sidebar';
import { MobileSidebar } from '../../components/dashboard-admin/mobile/MobileSidebar';
import { MobileHeader } from '../../components/dashboard-admin/mobile/MobileHeader';
import { StatCard } from '../../components/dashboard-admin/StatCard';
import { ChartSection } from '../../components/dashboard-admin/ChartSection';
import { TableSection } from '../../components/dashboard-admin/TableSection';
import { HeaderSection } from '../../components/dashboard-admin/HeaderSection';

import { DollarSign, BarChart, CheckCircle } from 'lucide-react';
import { overviewDashService } from '../../services/dashboard/overviewDashService';

export function VisaoGeral() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalTeachers: 0,
    totalHours: 0,
    totalAppointments: 0
  });
  const [charts, setCharts] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [statsData, revenueChart, lessonsChart, paymentsData] = await Promise.all([
        overviewDashService.getStats(),
        overviewDashService.getMonthlyRevenueChart(),
        overviewDashService.getLessonsPerDayChart(),
        overviewDashService.getRecentPaymentsTable()
      ]);
      setStats(statsData);
      setCharts([revenueChart, lessonsChart]);
      setPayments(paymentsData);
    }

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col md:flex-row">
      <Sidebar />
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <MobileHeader onOpen={() => setMobileMenuOpen(true)} />

      <div className="flex-1 md:ml-64 mt-20 md:mt-0">
        <HeaderSection title="Visão Geral" />
        <main className="p-6 space-y-8">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title={`R$ ${stats.totalRevenue.toLocaleString('pt-BR')}`}
              subtitle="Receita Total"
              // percentage="+12% este mês"
              percentageColor="text-green-500"
              icon={<DollarSign className="text-blue-500 w-5 h-5" />}
            />
            <StatCard
              title={stats.totalTeachers}
              subtitle="Total de Professores"
              // percentage="+5% este mês"
              percentageColor="text-green-500"
              icon={<BarChart className="text-blue-500 w-5 h-5" />}
            />
            <StatCard
              title={stats.totalHours}
              subtitle="Horas de Aula"
              // percentage="+8% comparado a Abril"
              percentageColor="text-green-500"
              icon={<BarChart className="text-purple-500 w-5 h-5" />}
            />
            <StatCard
              title={stats.totalAppointments}
              subtitle="Agendamentos"
              // percentage="+3% este mês"
              percentageColor="text-green-500"
              icon={<CheckCircle className="text-emerald-500 w-5 h-5" />}
            />
          </section>

          <ChartSection charts={charts} />

          <TableSection
            title="Pagamentos Recentes"
            data={payments}
            columns={[
              { label: 'Professor', accessor: 'teacherName' },
              { label: 'Data', accessor: 'dateTime' },
              { label: 'Valor / Hora', accessor: 'hourlyRate' },
              { label: 'Horas Trabalhadas', accessor: 'duration' },
              { label: 'Valor Total', accessor: 'totalValue' },
              { label: 'Status', accessor: 'paymentStatus' }
            ]}
          />
        </main>
      </div>
    </div>
  );
}
