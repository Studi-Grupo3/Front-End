import { useEffect, useState } from 'react';
import { Sidebar } from '../../components/dashboard-admin/Sidebar';
import { HeaderSection } from '../../components/dashboard-admin/HeaderSection';
import { MobileSidebar } from '../../components/dashboard-admin/mobile/MobileSidebar';
import { MobileHeader } from '../../components/dashboard-admin/mobile/MobileHeader';
import { StatCard } from '../../components/dashboard-admin/StatCard';
import { ChartSection } from '../../components/dashboard-admin/ChartSection';
import { TableSection } from '../../components/dashboard-admin/TableSection';
import { Users, CheckCircle, BookOpen, Star } from 'lucide-react';
import { teacherDashService } from '../../services/dashboard/teacherDashService';

export function Professores() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    totalTeachers: 0,
    activeTeachers: 0,
    totalHoursWorked: 0,
    averageHourlyRate: 0,
    averageMonthlyHours: 0
  });
  const [charts, setCharts] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [statsData, chartsData, paymentsData] = await Promise.all([
        teacherDashService.getStats(),
        teacherDashService.getCharts(),
        teacherDashService.getPayments()
      ]);
      setStats(statsData);
      setCharts(chartsData);
      setPayments(paymentsData);
    }
    fetchData();
  }, []);

  if (!stats) {
    return <div className="p-6 text-center">Carregando dados...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col md:flex-row">
      <Sidebar />
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <MobileHeader onOpen={() => setMobileMenuOpen(true)} />
      <div className="flex-1 md:ml-64 mt-20 md:mt-0">
        <HeaderSection title="Professores" />
        <main className="p-6 space-y-8">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title={stats.totalTeachers} subtitle="Total de Professores" icon={<Users className="w-5 h-5 text-blue-500" />} />
            <StatCard title={stats.activeTeachers} subtitle="Professores Ativos" icon={<CheckCircle className="w-5 h-5 text-emerald-500" />} />
            <StatCard title={stats.totalHoursWorked} subtitle="Total Horas de Aula no Mês" icon={<BookOpen className="w-5 h-5 text-purple-500" />} />
            <StatCard
              title={Number(stats.averageMonthlyHours).toFixed(0)}
              subtitle="Média de Horas Mensais"
              icon={<Star className="w-5 h-5 text-yellow-500" />}
            />
          </section>
          <ChartSection charts={charts} />
          <TableSection
            title="Lista de Professores"
            data={payments}
            columns={[
              { label: 'Professor', accessor: 'name' },
              { label: 'Disciplina', accessor: 'subject' },
              { label: 'Horas Trabalhadas', accessor: 'hours' },
              { label: 'Valor/Hora', accessor: 'value' },
              { label: 'Status', accessor: 'status' },
            ]}
          />
        </main>
      </div>
    </div>
  );
}
