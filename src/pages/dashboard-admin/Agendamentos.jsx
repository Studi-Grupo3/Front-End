import { Sidebar } from '../../components/dashboard-admin/Sidebar';
import { HeaderSection } from '../../components/dashboard-admin/HeaderSection';
import { StatCard } from '../../components/dashboard-admin/StatCard';
import { ChartSection } from '../../components/dashboard-admin/ChartSection';
import { TableSection } from '../../components/dashboard-admin/TableSection';

import { CalendarCheck2, Clock3, Timer, AlertTriangle } from 'lucide-react';
import { appointmentCharts } from '../../data/data-chart/appointmentCharts';
import { paymentsData } from '../../data/data-table/paymentTable';

export function Agendamentos() {
  return (
    <div className="flex min-h-screen bg-gray-100 flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 ml-64">
        <HeaderSection title="Agendamentos" />

        <main className="p-6 space-y-8">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="528"
              subtitle="Total de Agendamentos"
              percentage="+3% este mês"
              percentageColor="text-green-500"
              icon={<CalendarCheck2 className="text-emerald-600 w-5 h-5" />}
            />
            <StatCard
              title="312"
              subtitle="Agendamentos Concluídos"
              percentage="+4% em relação a Abril"
              percentageColor="text-green-500"
              icon={<Clock3 className="text-blue-500 w-5 h-5" />}
            />
            <StatCard
              title="158"
              subtitle="Agendamentos Pendentes"
              percentage="Estável"
              percentageColor="text-yellow-500"
              icon={<Timer className="text-yellow-500 w-5 h-5" />}
            />
            <StatCard
              title="58"
              subtitle="Cancelamentos"
              percentage="-2% em relação a Março"
              percentageColor="text-red-500"
              icon={<AlertTriangle className="text-red-600 w-5 h-5" />}
            />
          </section>

          <ChartSection charts={appointmentCharts} />

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
