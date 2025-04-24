import { useState } from 'react';
import { Sidebar } from '../../components/dashboard-admin/Sidebar';
import { HeaderSection } from '../../components/dashboard-admin/HeaderSection';
import { MobileSidebar } from '../../components/dashboard-admin/mobile/MobileSidebar';
import { MobileHeader } from '../../components/dashboard-admin/mobile/MobileHeader';
import { StatCard } from '../../components/dashboard-admin/StatCard';
import { ChartSection } from '../../components/dashboard-admin/ChartSection';
import { TableSection } from '../../components/dashboard-admin/TableSection';

import { CreditCard, Banknote, Wallet, TrendingUp } from 'lucide-react';
import { paymentCharts } from '../../data/data-chart/paymentCharts';
import { paymentsData } from '../../data/data-table/paymentTable';

export function Pagamentos() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col md:flex-row">
      <Sidebar />
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <MobileHeader onOpen={() => setMobileMenuOpen(true)} />

      <div className="flex-1 md:ml-64 mt-20 md:mt-0">
        <HeaderSection title="Pagamentos" />
        <main className="p-6 space-y-8">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="R$ 45.000,00"
              subtitle="Total de Pagamentos"
              percentage="+7% este mês"
              percentageColor="text-green-500"
              icon={<CreditCard className="text-green-600 w-5 h-5" />}
            />
            <StatCard
              title="R$ 38.000,00"
              subtitle="Pagamentos Confirmados"
              percentage="+6% este mês"
              percentageColor="text-green-500"
              icon={<Banknote className="text-blue-500 w-5 h-5" />}
            />
            <StatCard
              title="R$ 5.500,00"
              subtitle="Pendentes"
              percentage="-3% este mês"
              percentageColor="text-yellow-500"
              icon={<Wallet className="text-yellow-500 w-5 h-5" />}
            />
            <StatCard
              title="7 dias"
              subtitle="Tempo Médio de Processamento"
              percentage="Base Março"
              percentageColor="text-gray-500"
              icon={<TrendingUp className="text-gray-500 w-5 h-5" />}
            />
          </section>

          <ChartSection charts={paymentCharts} />
          <TableSection
            title="Pagamentos Recentes"
            data={paymentsData}
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
