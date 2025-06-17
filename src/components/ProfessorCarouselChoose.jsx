import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile}  from "../hooks/useIsMobile";

import prof1 from "../assets/professorFabio.png";
import prof2 from "../assets/professoraJuliana.png";
import botaoAnterior from "../assets/botaoAnterior.png";
import botaoProximo from "../assets/botaoProximo.png";

const professors = [
  { id: 1, name: "Fábio", location: "São Paulo (online)", subject: "Inglês", description: "Professor certificado por Cambridge e ex-cast member da Disney", image: prof1 },
  { id: 2, name: "Mariana Silva", location: "São Paulo (online)", subject: "História", description: "Mestrado em História", image: prof1 },
  { id: 3, name: "Juliana Costa", location: "São Paulo (online)", subject: "Matemática", description: "Doutorado em Matemática", image: prof2 },
  { id: 4, name: "Carlos Oliveira", location: "São Paulo (online)", subject: "Física", description: "Mestrado em Física", image: prof1 },
  { id: 5, name: "Ana Pereira", location: "São Paulo (online)", subject: "Química", description: "Doutorado em Química", image: prof2 },
];

const ProfessorCarouselChoose = () => {
  const nav = useNavigate();
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);
  const primary = "#3970B7";

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % professors.length);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + professors.length) % professors.length);
  };

  // Para desktop: pega 3 professores a partir do currentSlide, com wrap
  const getThree = () => {
    return [0, 1, 2].map((offset) => {
      const idx = (currentSlide + offset) % professors.length;
      return professors[idx];
    });
  };

  return (
    <main
      className="h-[calc(100vh-80px)] bg-gray-50 flex flex-col overflow-hidden"
    >
      <section
        className="flex-1 flex items-start justify-center pt-2 px-4"
      >
        <div
          className="w-full max-w-[1280px] bg-white border rounded-xl p-4 sm:p-6 shadow-sm"
          style={{ borderColor: primary }}
        >
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
            <button onClick={() => nav("/aluno/formulario")} className="hover:underline cursor-pointer">Detalhes</button>
            <span className="mx-1">›</span>
            <button onClick={() => nav("/aluno/modelo-aula")} className="hover:underline cursor-pointer">Modelo de Aula</button>
            <span className="mx-1">›</span>
            <span className="font-medium" style={{ color: primary }}>Professor</span>
          </nav>

          {/* Título */}
          <h1 className="text-2xl font-semibold text-center mb-4" style={{ color: primary }}>
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
            /* ==== MOBILE ==== */
            <div className="relative">
              <img
                src={professors[currentSlide].image}
                alt={professors[currentSlide].name}
                className="w-full h-40 object-cover rounded-t-xl"
              />

              <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer">
                <img src={botaoAnterior} alt="Anterior" className="w-9 h-9" />
              </button>
              <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                <img src={botaoProximo} alt="Próximo" className="w-9 h-9" />
              </button>

              <div className="bg-white rounded-b-xl border-t p-4" style={{ borderColor: primary }}>
                <h2 className="text-lg font-bold">{professors[currentSlide].name}</h2>
                <p className="text-gray-500 text-sm flex items-center mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {professors[currentSlide].location}
                </p>
                <p className="font-semibold mt-2" style={{ color: primary }}>
                  {professors[currentSlide].subject}
                </p>
                <p className="text-gray-600 text-sm mt-2">{professors[currentSlide].description}</p>

                <button
                  onClick={() => {
                    localStorage.setItem("selectedProfessorId", professors[currentSlide].id);
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
            /* ==== DESKTOP – 3 CARDS ==== */
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
                      <p className="font-semibold mt-2" style={{ color: primary }}>
                        {prof.subject}
                      </p>
                      <p className="text-gray-600 text-sm mt-2">{prof.description}</p>
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
