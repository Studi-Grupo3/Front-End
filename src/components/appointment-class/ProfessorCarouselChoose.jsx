import React, { useState, useEffect, useMemo } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import prof1 from '../../assets/professorFabio.png';
import prof2 from '../../assets/professoraJuliana.png';

// Array base de todos os professores
const allProfessors = [
  { id: 1, name: 'Fábio', location: 'São Paulo', subject: 'Matemática', image: prof1 },
  { id: 2, name: 'Mariana Silva', location: 'São Paulo', subject: 'Matemática', image: prof2 },
  { id: 3, name: 'Juliana Costa', location: 'São Paulo', subject: 'Matemática', image: prof2 },
  { id: 4, name: 'Carlos Oliveira', location: 'São Paulo', subject: 'Física', image: prof1 },
  { id: 5, name: 'Ana Pereira', location: 'São Paulo', subject: 'Química', image: prof2 },
];

export default function ProfessorCarouselChoose({ data, onUpdate, onNext }) {
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);
  const primary = '#3970B7';

  // Filtra só os professores da matéria selecionada
  const filtered = useMemo(() => {
    if (!data.subject) return [];
    return allProfessors.filter(p => p.subject === data.subject);
  }, [data.subject]);

  // Reseta o slide sempre que muda a lista filtrada
  useEffect(() => {
    setCurrentSlide(0);
  }, [filtered]);

  // Handlers de navegação
  const nextSlide = () => setCurrentSlide(i => (i + 1) % filtered.length);
  const prevSlide = () => setCurrentSlide(i => (i - 1 + filtered.length) % filtered.length);
  const getThree = () => [0, 1, 2].map(offset => filtered[(currentSlide + offset) % filtered.length]);

  const choose = prof => onUpdate({ professorId: prof.id });
  const enabled = !!data.professorId;

  // Se ainda não escolheu matéria
  if (!data.subject) {
    return (
      <p className="text-center text-gray-500">
        Escolha primeiro uma matéria para ver os professores disponíveis.
      </p>
    );
  }

  // Se não houver professores para a matéria
  if (filtered.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Não há professores cadastrados para {data.subject}.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {/* Botão "Não quero escolher" opcional */}
      <div className="flex justify-center">
        <button
          type="button"
          disabled={!enabled}
          onClick={onNext}
          className={`px-5 py-2 rounded-full text-sm bg-white border transition ${
            enabled ? 'border-[#3970B7] text-[#3970B7]' : 'border-gray-300 text-gray-400'
          }`}
        >
          Não quero escolher um professor
        </button>
      </div>

      {isMobile ? (
        // Versão móvel: 1 por vez
        <div className="relative bg-white rounded-lg shadow">
          <img
            src={filtered[currentSlide].image}
            alt={filtered[currentSlide].name}
            className="w-full h-40 object-cover rounded-t-lg"
          />
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <ChevronRight size={32} />
          </button>
          <div className="p-4 border-t rounded-b-lg" style={{ borderColor: primary }}>
            <h2 className="text-lg font-bold" style={{ color: primary }}>
              {filtered[currentSlide].name}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {filtered[currentSlide].location}
            </p>
            <p className="font-semibold mt-2" style={{ color: primary }}>
              {filtered[currentSlide].subject}
            </p>
            <button
              type="button"
              onClick={() => { choose(filtered[currentSlide]); onNext(); }}
              className="w-full py-2 mt-4 font-bold rounded-lg text-white"
              style={{ backgroundColor: primary }}
            >
              Agendar aula
            </button>
          </div>
        </div>
      ) : (
        // Versão desktop: mostra 3 de cada vez
        <div className="relative bg-white rounded-lg p-1">
          <div className="flex items-center justify-between">
            <button onClick={prevSlide}>
              <ChevronLeft size={32} />
            </button>
            <div className="flex gap-6 overflow-hidden">
              {getThree().map(prof => (
                <div
                  key={prof.id}
                  className="w-64 bg-white border rounded-lg shadow cursor-pointer flex-shrink-0"
                  style={{ borderColor: '#e5e7eb' }}
                  onClick={() => choose(prof)}
                >
                  <img
                    src={prof.image}
                    alt={prof.name}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-4 flex flex-col">
                    <h2 className="font-bold">{prof.name}</h2>
                    <p className="text-gray-500 text-sm mt-1">
                      {prof.location}
                    </p>
                    <p className="font-semibold mt-2" style={{ color: primary }}>
                      {prof.subject}
                    </p>
                    <button
                      type="button"
                      onClick={() => { choose(prof); onNext(); }}
                      className="mt-4 w-full py-2 font-bold rounded-lg text-white"
                      style={{ backgroundColor: primary }}
                    >
                      Agendar aula
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={nextSlide}>
              <ChevronRight size={32} />
            </button>
          </div>
          <div className="flex justify-center mt-4">
            {filtered.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full mx-1 ${
                  idx === currentSlide ? 'bg-[#3970B7]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}