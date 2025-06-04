// src/pages/dashboard/Agendamentos.jsx
import { useEffect, useState } from 'react';
import { Sidebar } from '../../components/dashboard-admin/Sidebar';
import { HeaderSection } from '../../components/dashboard-admin/HeaderSection';
import { MobileSidebar } from '../../components/dashboard-admin/mobile/MobileSidebar';
import { MobileHeader } from '../../components/dashboard-admin/mobile/MobileHeader';
import { StatCard } from '../../components/dashboard-admin/StatCard';
import { ChartSection } from '../../components/dashboard-admin/ChartSection';
import { TableSection } from '../../components/dashboard-admin/TableSection';
import { CalendarCheck2, Clock3, Timer, AlertTriangle } from 'lucide-react';
import { appointmentDashService } from '../../services/dashboard/appointmentDashService';

export function Agendamentos() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    confirmedCount: 0,
    activeStudents: 0,
    averageDuration: 0
  });
  const [charts, setCharts] = useState([]); 
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [statsData, chartConfigs, tableValues] = await Promise.all([
        appointmentDashService.getStats(),
        appointmentDashService.getCharts(),
        appointmentDashService.getTable()
      ]);
      console.log('Tabela carregada:', tableValues);
      setStats(statsData);
      setCharts(chartConfigs);
      setTableData(tableValues);
    }
    fetchData();
  }, []);

  if (!stats) {
    return <div className="p-6 text-center">Carregando dados...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col md:flex-row">
      <Sidebar />
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <MobileHeader onOpen={() => setMobileMenuOpen(true)} />

      <div className="flex-1 md:ml-64 mt-20 md:mt-0">
        <HeaderSection title="Agendamentos" />

        <main className="p-6 space-y-8">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title={stats.totalAppointments}
              subtitle="Total de Agendamentos"
              icon={<CalendarCheck2 className="w-5 h-5 text-emerald-500" />}
            />
            <StatCard
              title={stats.confirmedCount}
              subtitle="Agendamentos Confirmados"
              icon={<Clock3 className="w-5 h-5 text-blue-500" />}
            />
            <StatCard
              title={stats.activeStudents}
              subtitle="Alunos Ativos"
              icon={<Timer className="w-5 h-5 text-yellow-500" />}
            />
            <StatCard
              title={`${stats.averageDuration} min`}
              subtitle="Duração Média das Aulas"
              icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
            />
          </section>

          <ChartSection charts={charts} />

          <TableSection
            title="Agendamentos Recentes"
            data={tableData}
            columns={[
              { label: 'Aluno', accessor: 'studentName' },
              { label: 'Professor', accessor: 'teacherName' },
              { label: 'Data', accessor: 'date' },
              { label: 'Hora', accessor: 'time' },
              { label: 'Local', accessor: 'location' },
              { label: 'Status', accessor: 'status' },
            ]}
          />
        </main>
      </div>
    </div>
  );
}
