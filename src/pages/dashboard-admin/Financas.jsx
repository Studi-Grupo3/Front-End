import { Sidebar } from '../../components/dashboard-admin/Sidebar';
import { HeaderSection } from '../../components/dashboard-admin/HeaderSection';
import { StatCard } from '../../components/dashboard-admin/StatCard';
import { ChartSection } from '../../components/dashboard-admin/ChartSection';
import { TableSection } from '../../components/dashboard-admin/TableSection';

import { DollarSign, CreditCard, BarChart, CalendarClock } from 'lucide-react';
import { financeCharts } from '../../data/data-chart/financeCharts';
import { paymentsData } from '../../data/data-table/paymentTable';

export function Financas() {
  return (
    <div className="flex min-h-screen bg-gray-100 flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 ml-64">
        <HeaderSection title="Finanças" />

        <main className="p-6 space-y-8">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="R$ 62.543,00"
              subtitle="Receita Total"
              percentage="+15% este mês"
              percentageColor="text-green-500"
              icon={<DollarSign className="text-green-600 w-5 h-5" />}
            />
            <StatCard
              title="R$ 32.890,00"
              subtitle="Receita Confirmada"
              percentage="+10% em relação a Março"
              percentageColor="text-green-500"
              icon={<CreditCard className="text-blue-500 w-5 h-5" />}
            />
            <StatCard
              title="R$ 18.945,00"
              subtitle="Receita Pendente"
              percentage="-5% em relação a Março"
              percentageColor="text-red-500"
              icon={<BarChart className="text-yellow-500 w-5 h-5" />}
            />
            <StatCard
              title="2h"
              subtitle="Tempo Médio por Pagamento"
              percentage="Base Abril"
              percentageColor="text-gray-500"
              icon={<CalendarClock className="text-gray-500 w-5 h-5" />}
            />
          </section>

          <ChartSection charts={financeCharts} />

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
