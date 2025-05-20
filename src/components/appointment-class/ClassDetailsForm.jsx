import React, { useState } from 'react';
import { ChevronDown, Upload } from 'lucide-react';
import { useIsMobile } from '../../hooks/useIsMobile';
import AddMaterialModal from './AddMaterialModal';
import { useNavigate } from 'react-router-dom';
import NavbarPanel from '../NavbarPanel';

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
      const formData = new FormData();

      formData.append('phase', selectedPhase);
      formData.append('subject', selectedSubject);
      formData.append('duration', selectedDuration);

      // Adiciona os arquivos no FormData (se tiver mais de um arquivo)
      materials.forEach((mat, index) => {
        formData.append(`materials[${index}][name]`, mat.name);
        formData.append(`materials[${index}][file]`, mat.file);
      });

      // Envia para backend - ajuste a URL para seu backend real
      const response = await fetch('/api/classes', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro no envio');
      }

      // Se precisar, pode pegar dados da resposta:
      // const result = await response.json();

      alert('Aula agendada com sucesso!');
      navigate('/class-model');

    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Erro ao enviar dados. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      {/* Navbar fixed full width */}
      <header className="w-full fixed top-0 left-0 z-50">
        <div className="w-full bg-white shadow">
          <NavbarPanel />
        </div>
      </header>

      {/* Main content starts below navbar; adjust mt to header height (~5rem) */}
      <main className={`mx-auto max-w-4xl ${isMobile ? 'p-4 mt-20' : 'p-6 mt-20'} bg-white rounded-lg shadow-sm`}>
        <header className={`${isMobile ? 'mb-4' : 'mb-6'} ${!isMobile ? 'border-b pb-3' : ''}`}>
          <h2 className={`text-blue-600 font-medium ${isMobile ? 'text-base' : 'text-lg'}`}>Detalhes</h2>
        </header>

        <section className={`text-center ${isMobile ? 'mb-5' : 'mb-7'}`}>
          <h1 className={`text-blue-600 font-semibold ${isMobile ? 'text-xl' : 'text-2xl'} mb-2`}>Detalhes da Aula</h1>
          <p className="text-gray-600 text-sm">Preencha os detalhes para agendar sua próxima aula.</p>
        </section>

        <section className="space-y-6 mb-6">
          {/* Phase selection */}
          <div>
            <p className="text-sm mb-3 mt-6">Escolha a fase escolar</p>
            <div className="relative mb-3">
              <select
                className="w-full p-3 border border-gray-300 rounded appearance-none text-center text-gray-500"
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

          {/* Subject selection */}
          <div>
            <p className="text-sm mb-3 mt-6">Escolha uma matéria</p>
            <div className="relative mb-3">
              <select
                className="w-full p-3 border border-gray-300 rounded appearance-none text-center text-gray-500"
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

          {/* Duration selection */}
          <div>
            <p className="text-sm mb-3 mt-6">Selecione a duração da aula</p>
            <div className="relative mb-3">
              <select
                className="w-full p-3 border border-gray-300 rounded appearance-none text-center text-gray-500"
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

          {/* Materials section */}
          <div>
            <p className="text-sm mb-3 mt-6">{isMobile ? 'Material de Aula' : 'Material de Aula Atual'}</p>
            {!isMobile && (
              <div className="border border-gray-200 rounded p-4 mb-3 min-h-12">
                {materials.length > 0 ? (
                  materials.map(mat => (
                    <div key={mat.id} className="text-sm text-gray-600 mb-1">{mat.name}</div>
                  ))
                ) : (
                  <div className="text-sm text-gray-400 text-center">Nenhum material adicionado</div>
                )}
              </div>
            )}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center w-full py-3 text-blue-600 hover:bg-blue-50 rounded transition-colors border border-gray-200"
              disabled={isSubmitting}
            >
              <Upload size={16} className="mr-2" />
              <span>Adicionar Material</span>
            </button>
          </div>
        </section>

        <div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Enviando...' : 'Continuar'}
          </button>
        </div>
      </main>

      <AddMaterialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddMaterial={handleAddMaterial}
      />
    </div>
  );
};

export default ClassDetailsForm;
