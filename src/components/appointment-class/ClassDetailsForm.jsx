import React, { useState } from 'react';
import { ChevronDown, Upload } from 'lucide-react';
import { useIsMobile } from '../../hooks/useIsMobile';
import AddMaterialModal from './AddMaterialModal';
import { useNavigate } from 'react-router-dom'; 

const ClassDetailsForm = () => {
  const navigate = useNavigate();  
  const isMobile = useIsMobile();
  const [selectedPhase, setSelectedPhase] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [materials, setMaterials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const phaseOptions = ['Ensino Fundamental I', 'Ensino Fundamental II', 'Ensino Médio', 'Ensino Superior'];
  const subjectOptions = ['Matemática', 'Português', 'História', 'Geografia', 'Ciências', 'Física', 'Química'];
  const durationOptions = ['30 minutos', '45 minutos', '1 hora', '1 hora e 30 minutos', '2 horas'];

  const handleAddMaterial = (newMaterial) => {
    setMaterials([...materials, {
      id: Date.now(),
      name: newMaterial.name,
      file: newMaterial.file
    }]);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm w-full ${isMobile ? 'p-4' : 'p-6'}`}>
      <div className={`${isMobile ? 'mb-4' : 'mb-6'} ${!isMobile ? 'border-b pb-3' : ''}`}>
        <h2 className={`text-blue-600 font-medium ${isMobile ? 'text-base' : 'text-lg'}`}>
          Detalhes
        </h2>
      </div>

      <div className={`text-center ${isMobile ? 'mb-5' : 'mb-7'}`}>
        <h1 className={`text-blue-600 font-semibold ${isMobile ? 'text-xl' : 'text-2xl'} mb-2`}>
          Detalhes da Aula
        </h1>
        <p className="text-gray-600 text-sm">Preencha os detalhes para agendar sua próxima aula.</p>
      </div>

      <div className="space-y-6 mb-6">
        <div>
          <p className="text-sm mb-3 mt-6">Escolha a fase escolar</p>
          <div className="relative mb-3">
            <select
              className="w-full p-3 border border-gray-300 rounded appearance-none text-center text-gray-500"
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value)}
            >
              <option value="">Selecione a fase escolar</option>
              {phaseOptions.map((phase) => (
                <option key={phase} value={phase}>{phase}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        <div>
          <p className="text-sm mb-3 mt-6">Escolha uma matéria</p>
          <div className="relative mb-3">
            <select
              className="w-full p-3 border border-gray-300 rounded appearance-none text-center text-gray-500"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">Selecione uma matéria</option>
              {subjectOptions.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        <div>
          <p className="text-sm mb-3 mt-6">Selecione a duração da aula</p>
          <div className="relative mb-3">
            <select
              className="w-full p-3 border border-gray-300 rounded appearance-none text-center text-gray-500"
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
            >
              <option value="">Selecione a duração da aula</option>
              {durationOptions.map((duration) => (
                <option key={duration} value={duration}>{duration}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        <div>
          <p className="text-sm mb-3 mt-6">{isMobile ? 'Material de Aula' : 'Material de Aula Atual'}</p>
          {!isMobile && (
            <div className="border border-gray-200 rounded p-4 mb-3 min-h-12">
              {materials.map((material) => (
                <div key={material.id} className="text-sm text-gray-600 mb-1">{material.name}</div>
              ))}
              {materials.length === 0 && (
                <div className="text-sm text-gray-400 text-center">Nenhum material adicionado</div>
              )}
            </div>
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center w-full py-3 text-blue-600 hover:bg-blue-50 rounded transition-colors border border-gray-200"
          >
            <Upload size={16} className="mr-2" />
            <span>Adicionar Material</span>
          </button>
        </div>
      </div>

      <div>
        <button
         onClick={() => navigate('/class-model')} 
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded transition-colors">
          Continuar
        </button>
      </div>

      <AddMaterialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddMaterial={handleAddMaterial}
      />
    </div>
  );
};

export default ClassDetailsForm;
