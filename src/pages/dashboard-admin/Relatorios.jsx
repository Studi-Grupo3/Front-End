import { useState } from 'react';
import { Sidebar } from '../../components/dashboard-admin/Sidebar';
import { MobileSidebar } from '../../components/dashboard-admin/mobile/MobileSidebar';
import { MobileHeader } from '../../components/dashboard-admin/mobile/MobileHeader';
import { HeaderSection } from '../../components/dashboard-admin/HeaderSection';
import { ChartSection } from '../../components/dashboard-admin/ChartSection';
import {
  financeCharts,
  studentCharts,
  classCharts,
} from '../../data/data-chart/reportCharts';
import { ReportCard } from '../../components/dashboard-admin/reports/ReportCard';
import { Printer, FileText } from 'lucide-react';

export function Relatorios() {
  const [tab, setTab] = useState('financeiro');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDownload = (titulo) => {
    alert(`📥 Baixando relatório de ${titulo}... (mock)`);
  };

  const handleSendEmail = (titulo) => {
    alert(`📧 Enviando relatório de ${titulo} por email... (mock)`);
  };

  const relatorios = [
    {
      titulo: 'Financeiro',
      descricao: 'Dados financeiros completos, incluindo receitas, despesas e lucros.',
    },
    {
      titulo: 'Professores',
      descricao: 'Resumo de desempenho dos professores e suas aulas ministradas.',
    },
    {
      titulo: 'Alunos',
      descricao: 'Resumo de participação, progresso, engajamento e retenção dos alunos.',
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 text-sm flex-col md:flex-row">
      <Sidebar />
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <MobileHeader onOpen={() => setMobileMenuOpen(true)} />

      <main className="flex-1 md:ml-64 mt-20 md:mt-0">
        <HeaderSection title="Relatórios" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 px-4">
          {relatorios.map((relatorio) => (
            <ReportCard
              key={relatorio.titulo}
              title={`Relatório de ${relatorio.titulo}`}
              description={relatorio.descricao}
              onDownload={() => handleDownload(relatorio.titulo)}
              onEmail={() => handleSendEmail(relatorio.titulo)}
            />
          ))}
        </div>

        <div className="flex w-full mt-6 mb-4 px-4">
          {['financeiro', 'alunos', 'aulas'].map((key) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`cursor-pointer flex-1 text-center py-2 text-sm font-medium border-b-2 transition ${
                tab === key
                  ? 'border-[#3970B7] text-[#3970B7] bg-white'
                  : 'border-transparent text-gray-500 bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        {tab === 'financeiro' && <div className="px-4"><ChartSection charts={financeCharts} /></div>}
        {tab === 'alunos' && <div className="px-4"><ChartSection charts={studentCharts} /></div>}
        {tab === 'aulas' && <div className="px-4"><ChartSection charts={classCharts} /></div>}

        <div className="flex justify-end gap-3 mt-2 px-4 mb-6">
          <button className="flex items-center gap-1 px-4 py-2 border border-[#3970B7] text-[#3970B7] rounded hover:bg-[#e1eaf9] transition text-xs font-medium">
            <Printer className="w-4 h-4" />
            Imprimir Relatório
          </button>
          <button className="flex items-center gap-1 px-4 py-2 bg-[#3970B7] text-white rounded hover:bg-[#2e5a94] transition text-xs font-medium">
            <FileText className="w-4 h-4" />
            Gerar Relatório Completo
          </button>
        </div>
      </main>
    </div>
  );
}
