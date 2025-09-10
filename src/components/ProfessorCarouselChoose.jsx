import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";

import { teacherService } from "../services/teacherService";

import botaoAnterior from "../assets/botaoAnterior.png";
import botaoProximo from "../assets/botaoProximo.png";

const subjectMap = {
  PORTUGUESE: "Português",
  MATHEMATICS: "Matemática",
  GEOGRAPHY: "Geografia",
  HISTORY: "História",
  SCIENCE: "Ciências",
  CHEMISTRY: "Química",
  PHYSICS: "Física",
};

const ProfessorCarouselChoose = () => {
  const nav = useNavigate();
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [professors, setProfessors] = useState([]);
  const primary = "#3970B7";

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const data = await teacherService.list();
        console.log("Professores recebidos:", data);

        const enriched = data.map((prof, idx) => {
          const subjectsTranslated = prof.subjects
            ?.map((s) => subjectMap[s])
            .filter(Boolean);

          return {
            ...prof,
            location: "São Paulo (online)",
            description:
              prof.resumeTeacher ||
              "Professor experiente em " +
                (subjectsTranslated?.join(", ") || "Matérias não informadas"),
            image: idx % 2 === 0 ? prof1 : prof2,
            subjectsTranslated,
          };
        });

        setProfessors(enriched);
      } catch (err) {
        console.error("Erro ao carregar professores:", err);
      }
    };

    fetchProfessors();
  }, []);

  const nextSlide = () => {
    if (professors.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % professors.length);
    }
  };

  const prevSlide = () => {
    if (professors.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + professors.length) % professors.length);
    }
  };

  const getThree = () => {
    if (professors.length === 0) return [];
    return [0, 1, 2].map((offset) => {
      const idx = (currentSlide + offset) % professors.length;
      return professors[idx];
    });
  };

  if (professors.length === 0) {
    return (
      <main className="h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Carregando professores...</p>
      </main>
    );
  }

  return (
    <main className="h-[calc(100vh-80px)] bg-gray-50 flex flex-col overflow-hidden">
      <section className="flex-1 flex items-start justify-center pt-2 px-4">
        <div
          className="w-full max-w-[1280px] bg-white border rounded-xl p-4 sm:p-6 shadow-sm"
          style={{ borderColor: primary }}
        >
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
            <button
              onClick={() => nav("/aluno/formulario")}
              className="hover:underline cursor-pointer"
            >
              Detalhes
            </button>
            <span className="mx-1">›</span>
            <button
              onClick={() => nav("/aluno/modelo-aula")}
              className="hover:underline cursor-pointer"
            >
              Modelo de Aula
            </button>
            <span className="mx-1">›</span>
            <span className="font-medium" style={{ color: primary }}>
              Professor
            </span>
          </nav>

          {/* Título */}
          <h1
            className="text-2xl font-semibold text-center mb-4"
            style={{ color: primary }}
          >
            Escolha um professor
          </h1>

          {/* “Não quero escolher” */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => nav("/aluno/agendar-aula")}
              className="px-5 py-2 rounded-full text-sm cursor-pointer transition"
              style={{
                border: `1px solid ${primary}`,
                color: primary,
                backgroundColor: `${primary}10`,
              }}
            >
              Não quero escolher um professor
            </button>
          </div>

          {isMobile ? (
            <div className="relative">
              <img
                src={professors[currentSlide].image}
                alt={professors[currentSlide].name}
                className="w-full h-40 object-cover rounded-t-xl"
              />

              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <img src={botaoAnterior} alt="Anterior" className="w-9 h-9" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <img src={botaoProximo} alt="Próximo" className="w-9 h-9" />
              </button>

              <div
                className="bg-white rounded-b-xl border-t p-4"
                style={{ borderColor: primary }}
              >
                <h2 className="text-lg font-bold">
                  {professors[currentSlide].name}
                </h2>
                <p className="text-gray-500 text-sm flex items-center mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {professors[currentSlide].location}
                </p>
                <p className="font-semibold mt-2" style={{ color: primary }}>
                  {professors[currentSlide].subjectsTranslated?.join(", ")}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  {professors[currentSlide].description}
                </p>

                <button
                  onClick={() => {
                    localStorage.setItem(
                      "selectedProfessorId",
                      professors[currentSlide].id
                    );
                    nav("/aluno/agendar-aula");
                  }}
                  className="w-full py-2 font-bold rounded-lg mt-4 cursor-pointer transition"
                  style={{ backgroundColor: primary, color: "#fff" }}
                >
                  📅 Agendar aula →
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <button onClick={prevSlide} className="cursor-pointer">
                <img src={botaoAnterior} alt="Anterior" className="w-12 h-10" />
              </button>

              <div className="flex gap-6 overflow-hidden">
                {getThree().map((prof) => (
                  <div
                    key={prof.id}
                    className="bg-white border rounded-2xl shadow-lg flex flex-col w-[280px] cursor-pointer"
                    style={{ borderColor: "#e5e7eb" }}
                  >
                    <img
                      src={prof.image}
                      alt={prof.name}
                      className="w-full h-40 object-cover rounded-t-2xl"
                    />
                    <div className="p-4 flex-grow flex flex-col">
                      <h2 className="text-lg font-bold">{prof.name}</h2>
                      <p className="text-gray-500 text-sm flex items-center mt-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {prof.location}
                      </p>
                      <p
                        className="font-semibold mt-2"
                        style={{ color: primary }}
                      >
                        {prof.subjectsTranslated?.join(", ")}
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        {prof.description}
                      </p>
                    </div>
                    <div
                      onClick={() => {
                        localStorage.setItem("selectedProfessorId", prof.id);
                        nav("/aluno/agendar-aula");
                      }}
                      className="p-4 border-t"
                      style={{ borderColor: "#e5e7eb" }}
                    >
                      <button
                        className="w-full py-2 font-bold rounded-lg transition"
                        style={{ backgroundColor: primary, color: "#fff" }}
                      >
                        📅 Agendar aula →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={nextSlide} className="cursor-pointer">
                <img src={botaoProximo} alt="Próximo" className="w-12 h-10" />
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProfessorCarouselChoose;
