import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

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

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    centered: true, 
    slides: {
      perView: 3,
      spacing: 24,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: {
          perView: 2,
          spacing: 16,
        },
      },
      "(max-width: 768px)": {
        slides: {
          perView: 1, 
          spacing: 12,
        },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const handlePrev = () => {
    if (instanceRef.current) {
      const total = instanceRef.current.track.details.slides.length;
      const perView = instanceRef.current.options.slides.perView || 3;
      const newIndex = currentSlide - perView;
      instanceRef.current.moveToIdx((newIndex + total) % total);
    }
  };

  const handleNext = () => {
    if (instanceRef.current) {
      const total = instanceRef.current.track.details.slides.length;
      const perView = instanceRef.current.options.slides.perView || 3;
      const newIndex = currentSlide + perView;
      instanceRef.current.moveToIdx(newIndex % total);
    }
  };

  return (
    <main className="flex min-h-screen bg-gray-50">
      <section className="flex-grow flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-full sm:max-w-[1280px] bg-white border border-gray-200 rounded-xl p-6 sm:p-10 shadow-sm">

          
          <nav className="text-[13px] sm:text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
            <button onClick={() => nav("/")} className="hover:underline">Detalhes</button>
            <span className="mx-1">›</span>
            <button onClick={() => nav("/class-model")} className="hover:underline">Modelo de Aula</button>
            <span className="mx-1">›</span>
            <span className="text-blue-600 font-medium">Professor</span>
          </nav>

          <h1 className="text-xl sm:text-2xl font-semibold text-blue-600 text-center mb-4">
            Escolha um professor
          </h1>

        
          <div className="flex justify-center mb-2">
            <button
              type="button"
              onClick={() => alert("Continuar sem escolher professor")}
              className="px-4 sm:px-6 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50"
            >
              Não quero escolher um professor
            </button>
          </div>

          
          <div className="flex justify-between items-center w-full max-w-7xl px-4">
            <button onClick={handlePrev} className="mx-4 md:mx-6">
              <img src={botaoAnterior} alt="Anterior" />
            </button>

            <div className="overflow-hidden w-full">
              <div ref={sliderRef} className="keen-slider">
                {professors.map((card, index) => (
                  <div
                    key={index}
                    className="keen-slider__slide bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col"
                  >
                    <div className="w-full max-w-sm mx-auto flex flex-col h-full">
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-48 object-cover rounded-t-2xl"
                      />
                      <div className="p-4 flex-grow">
                        <h2 className="text-lg font-bold">{card.name}</h2>
                        <p className="text-gray-500 text-sm flex items-center mt-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          {card.location}
                        </p>
                        <p className="text-[#3A6FD8] font-semibold mt-2">{card.subject}</p>
                        <p className="text-gray-600 text-sm mt-2">{card.description}</p>
                      </div>
                      <div className="p-4 border-t border-gray-200 mt-auto">
                        <button className="w-full py-2 bg-[#3A6FD8] text-white font-bold rounded-lg hover:bg-blue-600 transition">
                          📅 Agendar aula →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={handleNext} className="mx-4 md:mx-6">
              <img src={botaoProximo} alt="Próximo" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfessorCarouselChoose;