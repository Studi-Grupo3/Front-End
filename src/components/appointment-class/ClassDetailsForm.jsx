import React, { useState } from 'react';
import { ChevronDown, Upload } from 'lucide-react';
import AddMaterialModal from './AddMaterialModal';

export default function ClassDetailsForm({ data, onUpdate, onNext }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const phaseOptions = [
    'Ensino Fundamental I',
    'Ensino Fundamental II',
    'Ensino Médio',
    'Ensino Superior'
  ];
  const subjectOptions = [
    'Matemática',
    'Português',
    'História',
    'Geografia',
    'Ciências',
    'Física',
    'Química'
  ];
  const durationOptions = [
    '30 minutos',
    '45 minutos',
    '1 hora',
    '1 hora e 30 minutos',
    '2 horas'
  ];

  const handleAddMaterial = newMaterial => {
    const updated = [
      ...(data.materials || []),
      { id: Date.now(), name: newMaterial.name, file: newMaterial.file }
    ];
    onUpdate({ materials: updated });
    setIsModalOpen(false);
  };

  // Não exige material de aula para avançar
  const allFilled =
    data.phase &&
    data.subject &&
    data.duration;

  return (
    <div className="space-y-4.5">
      {/* Fase escolar */}
      <div>
        <label className="block text-sm text-gray-700 mb-2">
          Escolha a fase escolar
        </label>
        <div className="relative">
          <select
            className="w-full p-2.5 pr-8 border border-gray-300 rounded text-sm appearance-none"
            value={data.phase || ''}
            onChange={e => onUpdate({ phase: e.target.value })}
          >
            <option value="">Selecione a fase escolar</option>
            {phaseOptions.map(phase => (
              <option key={phase} value={phase}>
                {phase}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
        </div>
      </div>

      {/* Matéria */}
      <div>
        <label className="block text-sm text-gray-700 mb-2">
          Escolha uma matéria
        </label>
        <div className="relative">
          <select
            className="w-full p-2.5 pr-8 border border-gray-300 rounded text-sm appearance-none"
            value={data.subject || ''}
            onChange={e => onUpdate({ subject: e.target.value })}
          >
            <option value="">Selecione uma matéria</option>
            {subjectOptions.map(subject => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
        </div>
      </div>

      {/* Duração */}
      <div>
        <label className="block text-sm text-gray-700 mb-2">
          Selecione a duração da aula
        </label>
        <div className="relative">
          <select
            className="w-full p-2.5 pr-8 border border-gray-300 rounded text-sm appearance-none"
            value={data.duration || ''}
            onChange={e => onUpdate({ duration: e.target.value })}
          >
            <option value="">Selecione a duração da aula</option>
            {durationOptions.map(duration => (
              <option key={duration} value={duration}>
                {duration}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
        </div>
      </div>

      {/* Material de Aula */}
      <div>
        <label className="block text-sm text-gray-700 mb-2">
          Material de Aula
        </label>
        {data.materials && data.materials.length > 0 && (
          <div className="border border-gray-200 rounded p-2.5 mb-2 text-sm text-gray-600">
            {data.materials.map(mat => (
              <div key={mat.id} className="mb-1">
                {mat.name}
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center w-full py-2.5 text-[#3970B7] hover:bg-[#3970B7]/10 rounded border border-gray-200 text-sm"
          type="button"
        >
          <Upload size={16} className="mr-2" />
          Adicionar Material
        </button>
      </div>

      {/* Botão Continuar */}
      <button
        onClick={onNext}
        disabled={!allFilled}
        className={
          allFilled
            ? 'w-full cursor-pointer py-2.5 bg-[#3970B7] text-white rounded hover:bg-[#2e5a94]'
            : 'w-full py-2.5 bg-gray-300 text-gray-500 rounded cursor-not-allowed'
        }
        type="button"
      >
        Continuar
      </button>

      {/* Modal de adição de material */}
      <AddMaterialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddMaterial={handleAddMaterial}
      />
    </div>
  );
}
