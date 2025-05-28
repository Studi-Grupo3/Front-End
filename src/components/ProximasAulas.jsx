import { CalendarDays, Clock, MapPin, Download, ExternalLink } from 'lucide-react';

const aulas = [
  {
    id: 1,
    titulo: 'Matemática - Cálculo I',
    aluno: 'Maria Santos',
    data: '12 de Maio, 2023',
    hora: '14:00 (1h30min)',
    local: 'Online - Sala 3',
    status: 'Em breve',
    statusCor: 'bg-yellow-100 text-yellow-800',
  },
  {
    id: 2,
    titulo: 'Física - Mecânica',
    aluno: 'João Oliveira',
    data: '12 de Maio, 2023',
    hora: '16:30 (2h)',
    local: 'Sala 204 - Bloco B',
    status: 'Agendada',
    statusCor: 'bg-blue-100 text-blue-800',
  },
  {
    id: 3,
    titulo: 'Química - Orgânica',
    aluno: 'Ana Silva',
    data: '13 de Maio, 2023',
    hora: '09:00 (1h)',
    local: 'Online - Sala 1',
    status: 'Agendada',
    statusCor: 'bg-blue-100 text-blue-800',
  },
];

export default function ProximasAulas() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold text-gray-900">Próximas Aulas</h2>
      <p className="text-sm text-gray-500 mb-4">
        Veja suas aulas agendadas para os próximos dias
      </p>

      {aulas.map((aula) => (
        <div key={aula.id} className="relative bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
          <span
            className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${aula.statusCor}`}
          >
            {aula.status}
          </span>

          <h3 className="text-base font-semibold text-gray-900">{aula.titulo}</h3>
          <p className="text-sm text-gray-500 mb-3">Aluno: {aula.aluno}</p>

          <div className="flex items-start text-sm text-gray-700 space-y-1 flex-col mb-4">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} /> {aula.data}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} /> {aula.hora}
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} /> {aula.local}
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition">
              <Download size={16} /> Material
            </button>
            <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition">
              <ExternalLink size={16} /> Detalhes
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
