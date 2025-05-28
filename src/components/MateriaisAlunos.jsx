import { Eye, Download, FileText } from 'lucide-react';

const materiais = [
  {
    id: 1,
    titulo: 'Lista de Exercícios - Cálculo I',
    autor: 'Maria Santos',
    data: '10/05/2023',
    categoria: 'Matemática',
    tamanho: '1.2 MB',
    cor: 'text-red-500',
    bg: 'bg-red-100',
    icone: 'text-red-500',
  },
  {
    id: 2,
    titulo: 'Resumo para Prova - Mecânica',
    autor: 'João Oliveira',
    data: '09/05/2023',
    categoria: 'Física',
    tamanho: '850 KB',
    cor: 'text-blue-500',
    bg: 'bg-blue-100',
    icone: 'text-blue-500',
  },
];

export default function MateriaisAlunos() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800">Materiais dos Alunos</h2>
      <p className="text-sm text-gray-500 mt-1 mb-4">
        Visualize e baixe os materiais compartilhados pelos alunos
      </p>

      <div className="space-y-4">
        {materiais.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border-gray-200 rounded-xl bg-white shadow-sm border"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg bg-opacity-10 ${item.bg}`}>
                <FileText className={`w-6 h-6 ${item.icone}`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{item.titulo}</h3>
                <div className="text-sm text-gray-500 flex items-center gap-2 mt-0.5">
                  <span>{item.autor}</span>
                  <span className="text-xs">•</span>
                  <span>{item.data}</span>
                </div>
                <div className="mt-2 flex items-center gap-3 text-sm">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.bg} ${item.cor}`}
                  >
                    {item.categoria}
                  </span>
                  <span className="text-gray-500">{item.tamanho}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Eye className="w-5 h-5 text-gray-600 cursor-pointer hover:text-black" />
              <Download className="w-5 h-5 text-gray-600 cursor-pointer hover:text-black" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
