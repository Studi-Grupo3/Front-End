import React, { useState, useEffect, useMemo } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { teacherService } from '../../services/teacherService';

const subjectMap = {
  PORTUGUESE: "Português",
  MATHEMATICS: "Matemática",
  GEOGRAPHY: "Geografia",
  HISTORY: "História",
  SCIENCE: "Ciências",
  CHEMISTRY: "Química",
  PHYSICS: "Física",
};


export default function ProfessorCarouselChoose({ data, onUpdate, onNext }) {
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const primary = '#3970B7';

useEffect(() => {
  setLoading(true);
  teacherService.list()
    .then((professorsData) => {
      // professorsData pode ser Page<T> ({ content, totalPages, ... }) ou array
      const list = Array.isArray(professorsData)
        ? professorsData
        : (Array.isArray(professorsData?.content) ? professorsData.content : []);

      const allowedSubjects = [
        "PORTUGUESE",
        "MATHEMATICS",
        "HISTORY",
        "GEOGRAPHY",
        "SCIENCE",
        "PHYSICS",
        "CHEMISTRY",
      ];

      const enriched = list.map((prof) => {
        const subjectsArray = Array.isArray(prof.subjects) ? prof.subjects : [];
        const translatedSubjects = subjectsArray
          .filter((s) => allowedSubjects.includes(s))
          .map((s) => subjectMap[s]);

        return {
          ...prof,
          location: "São Paulo (online)",
          subjectsTranslated: translatedSubjects,
          description:
            prof.resumeTeacher ||
            `Professor experiente em ${translatedSubjects.length ? translatedSubjects.join(", ") : "sua área"}`,
        };
      });

      const unique = enriched.filter(
        (prof, index, self) => index === self.findIndex((p) => p.id === prof.id)
      );

      setProfessors(unique);
    })
    .catch((err) => {
      console.error("Erro ao carregar professores:", err);
      setError("Erro ao buscar professores");
    })
    .finally(() => setLoading(false));
}, [data?.subject]);

  const filtered = useMemo(() => {
    if (!data.subject) return professors;
    return professors.filter((p) =>
      p.subjectsTranslated?.some(
        (s) => s.toLowerCase() === data.subject.toLowerCase()
      )
    );
  }, [data.subject, professors]);

  useEffect(() => setCurrentSlide(0), [filtered]);

  const nextSlide = () =>
    filtered.length > 0 && setCurrentSlide((i) => (i + 1) % filtered.length);

  const prevSlide = () =>
    filtered.length > 0 && setCurrentSlide((i) => (i - 1 + filtered.length) % filtered.length);

  const getVisible = () => {
    if (filtered.length <= 3) return filtered;
    return [0, 1, 2].map((offset) => filtered[(currentSlide + offset) % filtered.length]);
  };

  const choose = (prof) => onUpdate({ professorId: prof.id });
  const enabled = !!data.professorId;

  if (loading) {
    return <p className="text-center text-gray-500">Carregando professores...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }
  if (!data.subject) {
    return <p className="text-center text-gray-500">Escolha primeiro uma matéria para ver os professores disponíveis.</p>;
  }
  if (filtered.length === 0) {
    return <p className="text-center text-gray-500">Não há professores cadastrados para {data.subject}.</p>;
  }

  return (
    <div className="space-y-6">
      {/* <div className="flex justify-center">
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
      </div> */}

      {isMobile ? (
        <div className="relative bg-white rounded-lg shadow">
          {/* Espaço cinza no lugar da foto */}
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-t-lg">
            <span className="text-gray-500 text-sm">Sem foto</span>
          </div>
          {filtered.length > 1 && (
            <>
              <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2">
                <ChevronLeft size={32} />
              </button>
              <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2">
                <ChevronRight size={32} />
              </button>
            </>
          )}
          <div className="p-4 border-t rounded-b-lg" style={{ borderColor: primary }}>
            <h2 className="text-lg font-bold" style={{ color: primary }}>
              {filtered[currentSlide].name}
            </h2>
            <p className="text-gray-500 text-sm mt-1">{filtered[currentSlide].location}</p>
            <p className="font-semibold mt-2" style={{ color: primary }}>
              {filtered[currentSlide].subjectsTranslated?.join(", ")}
            </p>
            <p className="text-gray-600 text-sm mt-2">{filtered[currentSlide].description}</p>
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
        <div className="relative bg-white rounded-lg p-1">
          <div className="flex items-center justify-between w-full">
            {filtered.length > 3 && (
              <button onClick={prevSlide} className="cursor-pointer">
                <ChevronLeft size={32} />
              </button>
            )}
            <div className="flex gap-6 overflow-hidden justify-center w-full">
              {getVisible().map((prof) => (
                <div
                  key={prof.id}
                  className="w-64 bg-white border rounded-lg shadow flex-shrink-0"
                  style={{ borderColor: '#e5e7eb' }}
                  onClick={() => choose(prof)}
                >
                  {/* Espaço cinza no lugar da foto */}
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-t-lg">
                    <span className="text-gray-500 text-sm">Sem foto</span>
                  </div>
                  <div className="p-4 flex flex-col">
                    <h2 className="font-bold">{prof.name}</h2>
                    <p className="text-gray-500 text-sm mt-1">{prof.location}</p>
                    <p className="font-semibold mt-2" style={{ color: primary }}>
                      {prof.subjectsTranslated?.join(", ")}
                    </p>
                    <p className="text-gray-600 text-sm mt-2">{prof.description}</p>
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
                <ChevronRight size={32} className="cursor-pointer" />
              </button>
            )}
          </div>
          {filtered.length > 3 && (
            <div className="flex justify-center mt-4">
              {filtered.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full mx-1 ${idx === currentSlide ? 'bg-[#3970B7]' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
