import { Sidebar } from '../../components/dashboard-admin/Sidebar';
import { HeaderSection } from '../../components/dashboard-admin/HeaderSection';
import { StatCard } from '../../components/dashboard-admin/StatCard';
import { ChartSection } from '../../components/dashboard-admin/ChartSection';
import { TableSection } from '../../components/dashboard-admin/TableSection';

import { Users, CheckCircle, BookOpen, Star } from 'lucide-react';
import { teacherCharts } from '../../data/data-chart/teacherCharts';
import { paymentsData } from '../../data/data-table/paymentTable';

export function Professores() {
  return (
    <div className="flex min-h-screen bg-gray-100 flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 ml-64">
        <HeaderSection title="Professores" />

        <main className="p-6 space-y-8">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="24"
              subtitle="Total de Professores"
              percentage="+5% este mês"
              percentageColor="text-green-500"
              icon={<Users className="text-blue-500 w-5 h-5" />}
            />
            <StatCard
              title="18"
              subtitle="Professores Ativos"
              percentage="+2% este mês"
              percentageColor="text-green-500"
              icon={<CheckCircle className="text-emerald-500 w-5 h-5" />}
            />
            <StatCard
              title="1.250"
              subtitle="Horas de Aula"
              percentage="+8% em relação a Abril"
              percentageColor="text-green-500"
              icon={<BookOpen className="text-purple-500 w-5 h-5" />}
            />
            <StatCard
              title="4.7"
              subtitle="Média de Avaliação"
              percentage="Base de 120 avaliações"
              percentageColor="text-gray-500"
              icon={<Star className="text-yellow-500 w-5 h-5" />}
            />
          </section>

          <ChartSection charts={teacherCharts} />

          <TableSection
                      title="Pagamentos Recentes"
                      data={paymentsData}
                      columns={[
                        { label: 'Professor', accessor: 'name' },
                        { label: 'Data', accessor: 'date' },
                        { label: 'Valor', accessor: 'value' },
                        { label: 'Horas', accessor: 'hours' },
                        { label: 'Status', accessor: 'status' },
                        { label: 'Ações', accessor: 'actions' }
                      ]}
                    />
        </main>
      </div>
    </div>
  );
}
