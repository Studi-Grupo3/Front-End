import { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import botaoAnterior from "../assets/botaoAnterior.png";
import botaoProximo from "../assets/botaoProximo.png";
import { teacherService } from "../services/teacherService";

const ProfessorsSectionHome = () => {
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const data = await teacherService.listPublic();

        const allowedSubjects = [
          "PORTUGUESE",
          "MATHEMATICS",
          "HISTORY",
          "GEOGRAPHY",
          "SCIENCE",
          "PHYSICS",
          "CHEMISTRY",
        ];

        const filtered = data.map(prof => ({
          ...prof,
          subjects: prof.subjects?.filter(s => allowedSubjects.includes(s)) || []
        }));

        console.log("Professores carregados na Home (filtrados):", filtered);
        setProfessors(filtered);
      } catch (err) {
        console.error("Erro ao carregar professores na Home:", err);
      }
    };
    fetchProfessors();
  }, []);

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const subjectTranslations = {
    PORTUGUESE: "Português",
    MATHEMATICS: "Matemática",
    GEOGRAPHY: "Geografia",
    HISTORY: "História",
    SCIENCE: "Ciências",
    CHEMISTRY: "Química",
    PHYSICS: "Física",
  };

  const [sliderRef, instanceRef] = useKeenSlider(
    professors.length > 0
      ? {
          loop: true,
          renderMode: "performance",
          slides: {
            perView: 3,
            spacing: 24,
          },
          breakpoints: {
            "(max-width: 1024px)": {
              slides: { perView: 2, spacing: 16 },
            },
            "(max-width: 768px)": {
              slides: { perView: 1, spacing: 12 },
            },
          },
          created(s) {
            const details = s.track.details;
            const totalSlides = details.slides.length;
            const perView = (s.options.slides && s.options.slides.perView) || 3;
            setPageCount(Math.ceil(totalSlides / perView));
          },
          slideChanged(s) {
            const details = s.track.details;
            const perView = (s.options.slides && s.options.slides.perView) || 3;
            const newPage = Math.floor(details.rel / perView);
            setCurrentPage(newPage);
          },
        }
      : null
  );

  const handlePrev = () => {
    instanceRef.current && instanceRef.current.prev();
  };
  const handleNext = () => {
    instanceRef.current && instanceRef.current.next();
  };

  return (
    <div className="bg-[#3970B7] px-4 pt-12 pb-12 flex flex-col items-center">
      <div className="text-center mb-8 max-w-2xl">
        <p className="text-yellow-400 font-semibold">Encontre seu professor ideal</p>
        <h2 className="text-white text-4xl font-bold">Conheça Nossos Professores</h2>
        <p className="text-gray-200 font-extralight mt-2">
          Profissionais qualificados, apaixonados pelo ensino e prontos para ajudar você a alcançar
          seus objetivos acadêmicos.
        </p>
      </div>

      <div className="flex flex-col items-center w-full max-w-7xl">
        <div className="flex justify-between items-center w-full px-4">
          <button onClick={handlePrev} className="mx-2 md:mx-4">
            <img src={botaoAnterior} alt="Anterior" />
          </button>

          <div className="overflow-hidden w-full">
            <div ref={sliderRef} className="keen-slider">
              {professors.length > 0 ? (
                professors.map((prof) => (
                  <div
                    key={prof.id}
                    className="keen-slider__slide bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col overflow-hidden"
                  >
                    
                    <div className="w-full h-52 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Sem foto</span>
                    </div>

                    <div className="p-4 flex flex-col flex-grow">
                      <h2 className="text-lg font-bold text-gray-800">{prof.name}</h2>
                      <p className="text-gray-500 text-sm flex items-center mt-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        São Paulo (disponível online)
                      </p>
                      <p className="text-[#3970B7] font-semibold mt-2 flex items-center">
                        <span className="mr-2">🎓</span>
                        Professor(a) de{" "}
                        {prof.subjects?.length
                          ? subjectTranslations[prof.subjects[0]] || "Matéria não informada"
                          : "Matéria não informada"}
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        {prof.resumeTeacher || "Professor ainda não adicionou um resumo."}
                      </p>
                      <div className="mt-auto pt-4">
                        <button className="w-full flex items-center justify-center gap-2 py-2 bg-[#3970B7] text-white font-bold rounded-lg hover:bg-blue-600 transition">
                          📅 Agendar aula →
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-white text-center p-6">
                  Nenhum professor disponível no momento.
                </p>
              )}
            </div>
          </div>

          <button onClick={handleNext} className="mx-2 md:mx-4">
            <img src={botaoProximo} alt="Próximo" />
          </button>
        </div>

        <div className="flex mt-6">
          {Array.from({ length: pageCount }).map((_, pageIdx) => (
            <button
              key={pageIdx}
              onClick={() => {
                const perView =
                  (instanceRef.current?.options.slides &&
                    instanceRef.current.options.slides.perView) || 3;
                const targetSlide = pageIdx * perView;
                instanceRef.current && instanceRef.current.moveToIdx(targetSlide);
              }}
              className={`w-3 h-3 rounded-full mx-1 ${
                currentPage === pageIdx ? "bg-yellow-400" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessorsSectionHome;
