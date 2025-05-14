import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === professors.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? professors.length - 1 : prev - 1));
  };

  const currentProfessor = professors[currentSlide];

  return (
    <main className="flex min-h-screen bg-gray-50">
      
      <section className="flex-grow flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-full sm:max-w-[1280px] bg-white border border-gray-200 rounded-xl p-6 sm:p-10 shadow-sm">

        <nav className="text-[13px] sm:text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
            <button onClick={() => nav("/Class-Details")} className="hover:underline">Detalhes</button>
            <span className="mx-1">›</span>
            <button onClick={() => nav("/class-model")} className="hover:underline">Modelo de Aula</button>
            <span className="mx-1">›</span>
            <span className="text-blue-600 font-medium">Professor</span>
          </nav>

          <h1 className="text-xl sm:text-2xl font-semibold text-blue-600 text-center mb-4">
            Escolha um professor
          </h1>

          <div className="flex justify-center mb-6">
            <button
              type="button"
              onClick={() => navigate("/agendamentos")}
              className="px-4 sm:px-6 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50"
            >
              Não quero escolher um professor
            </button>
          </div>

          {isMobile ? (
            <div className="relative">
              <div className="relative w-full">
                <img
                  src={currentProfessor.image}
                  alt={currentProfessor.name}
                  className="w-full h-64 object-cover rounded-t-xl"
                />

                
                <button 
                  onClick={prevSlide} 
                  className="absolute left-1 top-1/2 -translate-y-1/2"
                >
                  <span className="sr-only">Anterior</span>
                  <img src={botaoAnterior} alt="Anterior" className="w-9 h-9" />
                </button>
                <button 
                  onClick={nextSlide} 
                  className="absolute right-1 top-1/2 -translate-y-1/2  "
                >
                  <span className="sr-only">Próximo</span>
                  <img src={botaoProximo} alt="Próximo" className="w-9 h-9" />
                </button>
              </div>

              <div className="bg-white rounded-b-xl border border-gray-200 border-t-0 p-4">
                <h2 className="text-lg font-bold">{currentProfessor.name}</h2>
                <p className="text-gray-500 text-sm flex items-center mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {currentProfessor.location}
                </p>
                <p className="text-[#3A6FD8] font-semibold mt-2">{currentProfessor.subject}</p>
                <p className="text-gray-600 text-sm mt-2">{currentProfessor.description}</p>

                <div className="mt-4">
                  <button 
                    onClick={() => navigate("/agendamentos")}
                    className="w-full py-2 bg-[#3A6FD8] text-white font-bold rounded-lg hover:bg-blue-600 transition"
                  >
                    📅 Agendar aula →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center w-full max-w-7xl px-4">
              <button onClick={prevSlide} className="mx-4 md:mx-6">
                <img src={botaoAnterior} alt="Anterior" className="w-12 h-10" />
              </button>

              <div className="overflow-hidden w-full flex justify-center">
                <div className="flex gap-4 w-full justify-center">
                  {professors.map((professor, index) => {
                    if (Math.abs(currentSlide - index) > 1 && !(currentSlide === 0 && index === professors.length - 1) && !(currentSlide === professors.length - 1 && index === 0)) {
                      return null;
                    }

                    return (
                      <div
                        key={professor.id}
                        className={`bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col ${
                          currentSlide === index ? "w-full max-w-sm" : "w-full max-w-xs"
                        }`}
                      >
                        <div className="w-full mx-auto flex flex-col h-full">
                          <img
                            src={professor.image}
                            alt={professor.name}
                            className="w-full h-48 object-cover rounded-t-2xl"
                          />
                          <div className="p-4 flex-grow">
                            <h2 className="text-lg font-bold">{professor.name}</h2>
                            <p className="text-gray-500 text-sm flex items-center mt-1">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              {professor.location}
                            </p>
                            <p className="text-[#3A6FD8] font-semibold mt-2">{professor.subject}</p>
                            <p className="text-gray-600 text-sm mt-2">{professor.description}</p>
                          </div>
                          <div 
                            onClick={() => navigate("/agendamentos")}
                            className="p-4 border-t border-gray-200 mt-auto cursor-pointer"
                          >
                            <button className="w-full py-2 bg-[#3A6FD8] text-white font-bold rounded-lg hover:bg-blue-600 transition">
                              📅 Agendar aula →
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button onClick={nextSlide} className="mx-4 md:mx-6">
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
