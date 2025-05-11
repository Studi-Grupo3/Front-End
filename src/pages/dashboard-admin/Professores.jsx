import { useEffect, useState } from 'react';
import { Sidebar } from '../../components/dashboard-admin/Sidebar';
import { HeaderSection } from '../../components/dashboard-admin/HeaderSection';
import { MobileSidebar } from '../../components/dashboard-admin/mobile/MobileSidebar';
import { MobileHeader } from '../../components/dashboard-admin/mobile/MobileHeader';
import { StatCard } from '../../components/dashboard-admin/StatCard';
import { ChartSection } from '../../components/dashboard-admin/ChartSection';
import { TableSection } from '../../components/dashboard-admin/TableSection';

import { Users, CheckCircle, BookOpen, Star } from 'lucide-react';
import { teacherService } from '../../services/teacherService';

export function Professores() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [charts, setCharts] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsData, chartsData, paymentsData] = await Promise.all([
          teacherService.getStats(),
          teacherService.getCharts(),
          teacherService.getPayments()
        ]);
        setStats(statsData);
        setCharts(chartsData);
        setPayments(paymentsData);
      } catch (err) {
        console.error('Erro ao carregar dados dos professores:', err.message);
      }
    }

    fetchData();
  }, []);

  if (!stats) return <div className="p-6">Carregando dados...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col md:flex-row">
      <Sidebar />
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <MobileHeader onOpen={() => setMobileMenuOpen(true)} />

      <div className="flex-1 md:ml-64 mt-20 md:mt-0">
        <HeaderSection title="Professores" />
        <main className="p-6 space-y-8">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title={stats.totalProfessores}
              subtitle="Total de Professores"
              percentage={stats.totalProfessoresChange}
              percentageColor="text-green-500"
              icon={<Users className="text-blue-500 w-5 h-5" />}
            />
            <StatCard
              title={stats.professoresAtivos}
              subtitle="Professores Ativos"
              percentage={stats.professoresAtivosChange}
              percentageColor="text-green-500"
              icon={<CheckCircle className="text-emerald-500 w-5 h-5" />}
            />
            <StatCard
              title={stats.horasAula}
              subtitle="Horas de Aula"
              percentage={stats.horasAulaChange}
              percentageColor="text-green-500"
              icon={<BookOpen className="text-purple-500 w-5 h-5" />}
            />
            <StatCard
              title={stats.mediaAvaliacao}
              subtitle="Média de Avaliação"
              percentage={stats.avaliacoesBase}
              percentageColor="text-gray-500"
              icon={<Star className="text-yellow-500 w-5 h-5" />}
            />
          </section>

          <ChartSection charts={charts} />
          <TableSection
            title="Pagamentos Recentes"
            data={payments}
            columns={[
              { label: 'Professor', accessor: 'name' },
              { label: 'Data', accessor: 'date' },
              { label: 'Valor', accessor: 'value' },
              { label: 'Horas', accessor: 'hours' },
              { label: 'Status', accessor: 'status' },
              { label: 'Ações', accessor: 'actions' },
            ]}
          />
        </main>
      </div>
    </div>
  );
}
