import React, { useState } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import prof1 from '../../assets/professorFabio.png';
import prof2 from '../../assets/professoraJuliana.png';

const professors = [
  { id: 1, name: 'Fábio', location: 'São Paulo', subject: 'Inglês', image: prof1 },
  { id: 2, name: 'Mariana Silva', location: 'São Paulo', subject: 'História', image: prof2 },
  { id: 3, name: 'Juliana Costa', location: 'São Paulo', subject: 'Matemática', image: prof2 },
  { id: 4, name: 'Carlos Oliveira', location: 'São Paulo', subject: 'Física', image: prof1 },
  { id: 5, name: 'Ana Pereira', location: 'São Paulo', subject: 'Química', image: prof2 },
];

export default function ProfessorCarouselChoose({ data, onUpdate, onNext }) {
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);
  const primary = '#3970B7';

  const nextSlide = () => setCurrentSlide(i => (i + 1) % professors.length);
  const prevSlide = () => setCurrentSlide(i => (i - 1 + professors.length) % professors.length);

  const getThree = () => [0, 1, 2].map(offset => professors[(currentSlide + offset) % professors.length]);
  const choose = prof => onUpdate({ professorId: prof.id });
  const enabled = !!data.professorId;

  return (
    <div className="space-y-6">
      {/* 'Não quero escolher um professor' */}
      <div className="flex justify-center">
        <button
          type="button"
          disabled={!enabled}
          onClick={onNext}
          className={`cursor-pointer px-5 py-2 rounded-full text-sm bg-white border transition ${
            enabled ? 'border-[#3970B7] text-[#3970B7]' : 'border-gray-300 text-gray-400'
          }`}
        >
          Não quero escolher um professor
        </button>
      </div>

      {isMobile ? (
        <div className="relative bg-white rounded-lg shadow">
          <img
            src={professors[currentSlide].image}
            alt={professors[currentSlide].name}
            className="w-full h-40 object-cover rounded-t-lg"
          />
          <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer">
            <ChevronLeft size={32} />
          </button>
          <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
            <ChevronRight size={32} />
          </button>
          <div className="p-4 border-t rounded-b-lg" style={{ borderColor: primary }}>
            <h2 className="text-lg font-bold" style={{ color: primary }}>{professors[currentSlide].name}</h2>
            <p className="text-gray-500 text-sm mt-1">{professors[currentSlide].location}</p>
            <p className="font-semibold mt-2" style={{ color: primary }}>{professors[currentSlide].subject}</p>
            <p className="text-gray-600 text-sm mt-2">{professors[currentSlide].description}</p>
            <button
              type="button"
              onClick={() => { choose(professors[currentSlide]); onNext(); }}
              className="w-full py-2 mt-4 font-bold rounded-lg text-white cursor-pointer"
              style={{ backgroundColor: primary }}
            >
              Agendar aula
            </button>
          </div>
        </div>
      ) : (
        <div className="relative bg-white rounded-lg p-1">
          <div className="flex items-center justify-between">
            <button onClick={prevSlide} className="cursor-pointer"><ChevronLeft size={32} /></button>
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
                    <p className="text-gray-500 text-sm mt-1">{prof.location}</p>
                    <p className="font-semibold mt-2" style={{ color: primary }}>{prof.subject}</p>
                    <p className="text-gray-600 text-sm mt-2">{prof.description}</p>
                    <button
                      type="button"
                      onClick={() => { choose(prof); onNext(); }}
                      className="mt-4 w-full py-2 font-bold rounded-lg text-white cursor-pointer"
                      style={{ backgroundColor: primary }}
                    >
                      Agendar aula
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={nextSlide} className="cursor-pointer"><ChevronRight size={32} /></button>
          </div>
          {/* indicators */}
          <div className="flex justify-center mt-4">
            {professors.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full mx-1 ${idx === currentSlide ? 'bg-[#3970B7]' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}