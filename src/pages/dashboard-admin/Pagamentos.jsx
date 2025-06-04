import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/dashboard-admin/Sidebar';
import { HeaderSection } from '../../components/dashboard-admin/HeaderSection';
import { MobileSidebar } from '../../components/dashboard-admin/mobile/MobileSidebar';
import { MobileHeader } from '../../components/dashboard-admin/mobile/MobileHeader';
import { StatCard } from '../../components/dashboard-admin/StatCard';
import { TableSection } from '../../components/dashboard-admin/TableSection';
import { ToggleSwitch } from '../../components/ui/ToggleSwitch';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';
import { CreditCard, Banknote, Wallet, TrendingUp } from 'lucide-react';
import { paymentDashService } from '../../services/dashboard/paymentDashService';

function formatCurrency(value) {
  if (value == null || isNaN(value)) return 'R$ 0,00';
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  });
}

export function Pagamentos() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [payments, setPayments] = useState([]);
  const [onlyPending, setOnlyPending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [month, setMonth] = useState(5);
  const [year, setYear] = useState(2025);

  const [modalData, setModalData] = useState({
    isOpen: false,
    item: null,
    title: '',
    message: ''
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsData, recentData] = await Promise.all([
          paymentDashService.getStats(month, year),
          paymentDashService.getRecent(month, year)
        ]);
        setStats(statsData);
        setPayments(recentData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }
    fetchData();
  }, [month, year]);

  const handleToggle = async (id) => {
    try {
      await paymentDashService.toggleStatus(id);
      const [statsData, recentData] = await Promise.all([
        paymentDashService.getStats(month, year),
        paymentDashService.getRecent(month, year)
      ]);
      setStats(statsData);
      setPayments(recentData);
    } catch (error) {
      console.error('Erro ao alternar status:', error);
    }
  };

  const openConfirmation = (item) => {
    const next = item.status === 'Pago' ? 'pendente' : 'pago';
    setModalData({
      isOpen: true,
      item,
      title: 'Confirmação de Status',
      message: `Tem certeza de que deseja marcar o professor "${item.name}" como ${next}?`
    });
  };

  const handleConfirm = () => {
    const { item } = modalData;
    setModalData(d => ({ ...d, isOpen: false }));
    handleToggle(item.id);
  };

  const handleCancel = () => {
    setModalData(d => ({ ...d, isOpen: false }));
  };

  if (!stats) return <div className="p-6">Carregando dados...</div>;

  const filtered = payments
    .filter(p => !onlyPending || p.status === 'Pendente')
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .map(item => ({
      ...item,
      valuePerHourFormatted: formatCurrency(item.valuePerHour),
      totalFormatted: formatCurrency(item.total)
    }));

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
              title={formatCurrency(stats.totalAmount)}
              subtitle="Total a Pagar"
              icon={<CreditCard />}
            />
            <StatCard
              title={formatCurrency(stats.pendingAmount)}
              subtitle="Pagamentos Pendentes"
              icon={<Wallet />}
            />
            <StatCard
              title={formatCurrency(stats.realizedAmount)}
              subtitle="Pagamentos Realizados"
              icon={<Banknote />}
            />
            <StatCard
              title={formatCurrency(stats.averageAmountPerTeacher)}
              subtitle="Média por Professor"
              icon={<TrendingUp />}
            />
          </section>

          <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
            <select
              value={month}
              onChange={e => setMonth(Number(e.target.value))}
              className="px-4 py-2 border rounded"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {new Date(0, i).toLocaleString('pt-BR', { month: 'long' })}
                </option>
              ))}
            </select>
            <select
              value={year}
              onChange={e => setYear(Number(e.target.value))}
              className="px-4 py-2 border rounded"
            >
              {[2025, 2024, 2023].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <label className="flex items-center space-x-2">
              <ToggleSwitch
                checked={onlyPending}
                onChange={() => setOnlyPending(prev => !prev)}
              />
              <span>Somente pendentes</span>
            </label>
          </div>

          <TableSection
            title="Pagamentos Recentes"
            data={filtered}
            columns={[
              { label: 'Professor', accessor: 'name' },
              { label: 'Disciplina', accessor: 'subject' },
              { label: 'Valor / Hora', accessor: 'valuePerHourFormatted' },
              { label: 'Horas Trabalhadas', accessor: 'hours' },
              { label: 'Valor total', accessor: 'totalFormatted' },
              { label: 'Status', accessor: 'status' },
              {
                label: 'Pago',
                render: item => (
                  <ToggleSwitch
                    checked={item.status === 'Pago'}
                    onChange={() => openConfirmation(item)}
                  />
                )
              }
            ]}
          />
          <ConfirmationModal
            isOpen={modalData.isOpen}
            title={modalData.title}
            message={modalData.message}
            confirmLabel="Alterar"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </main>
      </div>
    </div>
  );
}