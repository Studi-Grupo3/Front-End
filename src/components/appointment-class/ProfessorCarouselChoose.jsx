import React, { useState, useEffect, useMemo } from 'react';
import { teacherService } from '../../services/teacherService';
import { useIsMobile } from '../../hooks/useIsMobile';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import prof1 from '../../assets/professorFabio.png';
import prof2 from '../../assets/professoraJuliana.png';

// Remove array fixo, agora professores vêm do banco

export default function ProfessorCarouselChoose({ data, onUpdate, onNext }) {
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const primary = '#3970B7';
  const secondary = '#2e5a94';

  useEffect(() => {
    setLoading(true);
    teacherService.list()
      .then(data => {
        setProfessors(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Erro ao buscar professores');
        setLoading(false);
      });
  }, []);

  // Filtra só os professores da matéria selecionada
  const filtered = useMemo(() => {
    if (!data.subject) return [];
    return professors.filter(p => p.subject === data.subject);
  }, [data.subject, professors]);

  // Reseta o slide sempre que muda a lista filtrada
  useEffect(() => {
    setCurrentSlide(0);
  }, [filtered]);

  // Handlers de navegação
  const nextSlide = () => setCurrentSlide(i => (i + 1) % filtered.length);
  const prevSlide = () => setCurrentSlide(i => (i - 1 + filtered.length) % filtered.length);
  // Retorna até 3 professores, sem repetição
  const getVisible = () => {
    if (filtered.length <= 3) return filtered;
    // Se houver mais de 3, mostra 3 a partir do slide atual
    let result = [];
    for (let i = 0; i < 3; i++) {
      const idx = (currentSlide + i) % filtered.length;
      result.push(filtered[idx]);
    }
    return result;
  };

  const choose = prof => onUpdate({ professorId: prof.id });
  const enabled = !!data.professorId;

  if (loading) {
    return <p className="text-center text-gray-500">Carregando professores...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }
  if (!data.subject) {
    return (
      <p className="text-center text-gray-500">
        Escolha primeiro uma matéria para ver os professores disponíveis.
      </p>
    );
  }
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
          className={`px-5 py-2 rounded-full text-sm bg-white border transition cursor-pointer ${
            enabled ? 'border-[#3970B7] text-[#3970B7]' : 'border-gray-300 text-gray-400'
          }`}
        >
          Não quero escolher um professor
        </button>
      </div>

      {isMobile ? (
        // Versão móvel: 1 por vez
  <div className="relative bg-white rounded-lg shadow flex flex-col items-center justify-center">
          <img
            src={filtered[currentSlide].image || prof1}
            alt={filtered[currentSlide].name}
            className="w-full h-40 object-cover rounded-t-lg"
          />
          {filtered.length > 1 && (
            <>
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
            </>
          )}
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
              className="w-full py-2 mt-4 font-bold rounded-lg text-white cursor-pointer bg-[#3970B7] hover:bg-[#2e5a94]"
            >
              Agendar aula
            </button>
          </div>
        </div>
      ) : (
        // Versão desktop: mostra até 3 sem repetição
        <div className="relative bg-white rounded-lg p-1 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-full">
            {filtered.length > 3 && (
              <button onClick={prevSlide} className='cursor-pointer'>
                <ChevronLeft size={32} />
              </button>
            )}
            <div className="flex gap-6 overflow-hidden justify-center w-full">
              {getVisible().map(prof => (
                <div
                  key={prof.id}
                  className="w-64 bg-white border rounded-lg shadow flex-shrink-0"
                  style={{ borderColor: '#e5e7eb' }}
                  onClick={() => choose(prof)}
                >
                  <img
                    src={prof.image || prof1}
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
                      className="mt-4 w-full py-2 font-medium rounded-lg text-white cursor-pointer bg-[#3970B7] hover:bg-[#2e5a94]"
                    >
                      Agendar aula
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {filtered.length > 3 && (
              <button onClick={nextSlide}>
                <ChevronRight size={32} className='cursor-pointer'/>
              </button>
            )}
          </div>
          <div className="flex justify-center mt-4">
            {filtered.length > 3
              ? filtered.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full mx-1 ${
                      idx === currentSlide ? 'bg-[#3970B7]' : 'bg-gray-300'
                    }`}
                  />
                ))
              : null}
          </div>
        </div>
      )}
    </div>
  );
}