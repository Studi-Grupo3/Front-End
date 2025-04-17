import { Sidebar } from '../../components/dashboard-admin/Sidebar';
import { StatCard } from '../../components/dashboard-admin/StatCard';
import { ChartSection } from '../../components/dashboard-admin/ChartSection';
import { TableSection } from '../../components/dashboard-admin/TableSection';
import { HeaderSection } from '../../components/dashboard-admin/HeaderSection';
import { DollarSign, BarChart, CheckCircle } from 'lucide-react';
import { overviewCharts } from '../../data/data-chart/overviewCharts';
import { paymentsData } from '../../data/data-table/paymentTable';

export function VisaoGeral() {
  return (
    <div className="flex min-h-screen bg-gray-100 flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 ml-64">
        <HeaderSection title="Visão Geral" />

        <main className="p-6 space-y-8">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="R$ 45.678,90"
              subtitle="Receita Total"
              percentage="+12% este mês"
              percentageColor="text-green-500"
              icon={<DollarSign className="text-blue-500 w-5 h-5" />}
            />
            <StatCard
              title="24"
              subtitle="Total de Professores"
              percentage="+5% este mês"
              percentageColor="text-green-500"
              icon={<BarChart className="text-blue-500 w-5 h-5" />}
            />
            <StatCard
              title="1.250"
              subtitle="Horas de Aula"
              percentage="+8% comparado a Abril"
              percentageColor="text-green-500"
              icon={<BarChart className="text-purple-500 w-5 h-5" />}
            />
            <StatCard
              title="528"
              subtitle="Agendamentos"
              percentage="+3% este mês"
              percentageColor="text-green-500"
              icon={<CheckCircle className="text-emerald-500 w-5 h-5" />}
            />
          </section>

          <ChartSection charts={overviewCharts} />
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
