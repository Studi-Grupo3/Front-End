import React, { useState } from 'react';
import { ChevronDown, Upload } from 'lucide-react';
import { useIsMobile } from '../../hooks/useIsMobile';
import AddMaterialModal from './AddMaterialModal';
import { useNavigate } from 'react-router-dom';
import NavbarPanel from '../NavbarPanel';

import { contentService } from '../../services/contentService';

const ClassDetailsForm = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [selectedPhase, setSelectedPhase] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [materials, setMaterials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const phaseOptions = ['Ensino Fundamental I', 'Ensino Fundamental II', 'Ensino Médio', 'Ensino Superior'];
  const subjectOptions = ['Matemática', 'Português', 'História', 'Geografia', 'Ciências', 'Física', 'Química'];
  const durationOptions = ['30 minutos', '45 minutos', '1 hora', '1 hora e 30 minutos', '2 horas'];

  const handleAddMaterial = (newMaterial) => {
    setMaterials(prev => [
      ...prev,
      { id: Date.now(), name: newMaterial.name, file: newMaterial.file }
    ]);
  };

  const handleSubmit = async () => {
    if (!selectedPhase || !selectedSubject || !selectedDuration) {
      alert('Por favor, preencha todos os campos antes de continuar.');
      return;
    }
    if (materials.length === 0) {
      alert('Adicione pelo menos um material.');
      return;
    }
    setIsSubmitting(true);
    try {
      await contentService.createClass({
        phase: selectedPhase,
        subject: selectedSubject,
        duration: selectedDuration,
        materials
      });
      alert('Aula agendada com sucesso!');
      navigate('/class-model');
    } catch (error) {
      console.error('Erro ao enviar:', error);
      if (error.response) {
        console.error('Detalhes do erro:', error.response.data);
        alert(`Erro ao enviar dados: ${error.response.data.message || 'Tente novamente.'}`);
      } else if (error.request) {
        console.error('Nenhuma resposta recebida:', error.request);
        alert('Erro ao enviar dados: Nenhuma resposta recebida.');
      } else {
        console.error('Erro genérico:', error.message);
        alert(`Erro: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {/* Navbar fixa no topo. Ajuste h-16/pt-? se o Navbar tiver altura diferente */}
      <header className="fixed top-0 left-0 w-full h-16 z-50 bg-white shadow">
        <NavbarPanel />
      </header>

      {/* Conteúdo centralizado, com padding-top para não colar no Navbar */}
      <div className="flex-1 flex items-center justify-center pt-20">
        {/* Card principal: largura intermediária e padding aumentado para altura moderada */}
        <div
          className={`
            w-full 
            ${isMobile ? 'px-4' : ''} 
            max-w-[60%] 
            bg-white 
            rounded-lg 
            shadow 
            p-8
          `}
        >
          {/* Breadcrumb / Rótulo “Detalhes” no topo esquerdo */}
          <div className="mb-4">
            <span className="text-[#3970B7] text-sm font-medium cursor-default">
              Detalhes
            </span>
          </div>

          {/* Título centralizado */}
          <div className="space-y-1 mb-5">
            <h1 className={`text-[#3970B7] font-semibold ${isMobile ? 'text-base' : 'text-xl'} text-center`}>
              Detalhes da Aula
            </h1>
            <p className="text-gray-600 text-sm text-center">
              Preencha os detalhes para agendar sua próxima aula.
            </p>
          </div>

          {/* Formulário com espaçamento interno moderado */}
          <div className="space-y-5">
            {/* Fase escolar */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Escolha a fase escolar</label>
              <div className="relative">
                <select
                  className="w-full p-3 border border-gray-300 rounded appearance-none text-gray-600 text-sm"
                  value={selectedPhase}
                  onChange={e => setSelectedPhase(e.target.value)}
                >
                  <option value="">Selecione a fase escolar</option>
                  {phaseOptions.map(phase => (
                    <option key={phase} value={phase}>{phase}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            {/* Matéria */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Escolha uma matéria</label>
              <div className="relative">
                <select
                  className="w-full p-3 border border-gray-300 rounded appearance-none text-gray-600 text-sm"
                  value={selectedSubject}
                  onChange={e => setSelectedSubject(e.target.value)}
                >
                  <option value="">Selecione uma matéria</option>
                  {subjectOptions.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            {/* Duração */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Selecione a duração da aula</label>
              <div className="relative">
                <select
                  className="w-full p-3 border border-gray-300 rounded appearance-none text-gray-600 text-sm"
                  value={selectedDuration}
                  onChange={e => setSelectedDuration(e.target.value)}
                >
                  <option value="">Selecione a duração da aula</option>
                  {durationOptions.map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            {/* Material */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Material de Aula
              </label>
              {/* Lista de materiais só se houver */}
              {materials.length > 0 && (
                <div className="border border-gray-200 rounded p-3 mb-2 min-h-[2.5rem] text-sm text-gray-600">
                  {materials.map(mat => (
                    <div key={mat.id} className="mb-1">{mat.name}</div>
                  ))}
                </div>
              )}
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center w-full py-2.5 text-[#3970B7] hover:bg-[#3970B7]/10 rounded transition-colors border border-gray-200 text-sm"
                disabled={isSubmitting}
              >
                <Upload size={16} className="mr-2" />
                <span>Adicionar Material</span>
              </button>
            </div>
          </div>

          {/* Botão Continuar: cursor-pointer, padding vertical intermediário */}
          <div className="mt-5">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`
                w-full 
                text-white 
                py-2.5 
                rounded 
                text-sm 
                transition-colors 
                disabled:opacity-50 
                ${isSubmitting 
                  ? 'bg-[#3970B7]/70 cursor-not-allowed' 
                  : 'bg-[#3970B7] hover:bg-[#2e5a94] cursor-pointer'
                }
              `}
            >
              {isSubmitting ? 'Enviando...' : 'Continuar'}
            </button>
          </div>
        </div>
      </div>

      {/* Modal de adicionar material */}
      <AddMaterialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddMaterial={handleAddMaterial}
      />
    </div>
  );
};

export default ClassDetailsForm;
