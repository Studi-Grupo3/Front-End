import { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import professorFabio from "../assets/professorFabio.png";
import professoraJuliana from "../assets/professoraJuliana.png";
import botaoAnterior from "../assets/botaoAnterior.png";
import botaoProximo from "../assets/botaoProximo.png";

const Professor = () => {
  const cards = [
    {
      name: "Fábio",
      location: "São Paulo (disponível online)",
      subject: "Professor(a) de Inglês",
      description: "Professor certificado por Cambridge e ex-cast member da Disney",
      image: professorFabio,
    },
    {
      name: "Mariana Silva",
      location: "São Paulo (disponível online)",
      subject: "Professor(a) de História",
      description: "Mestrado em História",
      image: professorFabio,
    },
    {
      name: "Juliana Costa",
      location: "São Paulo (disponível online)",
      subject: "Professor(a) de Matemática",
      description: "Doutorado em Matemática",
      image: professoraJuliana,
    },
    {
      name: "Fábio",
      location: "São Paulo (disponível online)",
      subject: "Professor(a) de Inglês",
      description: "Professor certificado por Cambridge e ex-cast member da Disney",
      image: professorFabio,
    },
    {
      name: "Mariana Silva",
      location: "São Paulo (disponível online)",
      subject: "Professor(a) de História",
      description: "Mestrado em História",
      image: professorFabio,
    },
  ];

  // Quantas “páginas” existem (cada página exibe `perView` cards)
  const [pageCount, setPageCount] = useState(0);
  // Qual página (index) está ativa agora (= 0, 1, 2, …)
  const [currentPage, setCurrentPage] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      renderMode: "performance",
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
      created(s) {
        // Assim que o slider é criado, calculamos quantas “páginas” cabem no total.
        const details = s.track.details;
        const totalSlides = details.slides.length;
        const perView = (s.options.slides && s.options.slides.perView) || 3;
        const pages = Math.ceil(totalSlides / perView);
        setPageCount(pages);
        // Se quiser começar em outra página, pode usar s.moveToIdx(...)
      },
      slideChanged(s) {
        // A cada mudança de slide (scroll), atualizamos currentPage.
        const details = s.track.details;
        const perView = (s.options.slides && s.options.slides.perView) || 3;
        // “rel” é o índice do slide ativo, então dividimos por perView
        const newPage = Math.floor(details.rel / perView);
        setCurrentPage(newPage);
      },
    },
    []
  );

  // seta para anterior
  const handlePrev = () => {
    instanceRef.current && instanceRef.current.prev();
  };

  // seta para próximo
  const handleNext = () => {
    instanceRef.current && instanceRef.current.next();
  };

  return (
    <div className="bg-[#3970B7] px-4 pt-12 pb-12 flex flex-col items-center">
      {/* Título e subtítulo */}
      <div className="text-center mb-8 max-w-2xl">
        <p className="text-yellow-400 font-semibold">Encontre seu professor ideal</p>
        <h2 className="text-white text-4xl font-bold">Conheça Nossos Professores</h2>
        <p className="text-gray-200 font-extralight mt-2">
          Profissionais qualificados, apaixonados pelo ensino e prontos para ajudar você a alcançar
          seus objetivos acadêmicos.
        </p>
      </div>

      {/* Container do carrossel + setas */}
      <div className="flex flex-col items-center w-full max-w-7xl">
        <div className="flex justify-between items-center w-full px-4">
          {/* Botão “Anterior” */}
          <button onClick={handlePrev} className="mx-2 md:mx-4">
            <img src={botaoAnterior} alt="Anterior" />
          </button>

          {/* Carrossel em si */}
          <div className="overflow-hidden w-full">
            <div ref={sliderRef} className="keen-slider">
              {cards.map((card, idx) => (
                <div
                  key={idx}
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
                      <p className="text-[#3970B7] font-semibold mt-2">{card.subject}</p>
                      <p className="text-gray-600 text-sm mt-2">{card.description}</p>
                    </div>
                    <div className="p-4 border-t border-gray-200 mt-auto">
                      <button className="w-full py-2 bg-[#3970B7] text-white font-bold rounded-lg hover:bg-blue-600 transition">
                        📅 Agendar aula →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botão “Próximo” */}
          <button onClick={handleNext} className="mx-2 md:mx-4">
            <img src={botaoProximo} alt="Próximo" />
          </button>
        </div>

        {/* Bolinhas de paginação */}
        <div className="flex mt-6">
          {Array.from({ length: pageCount }).map((_, pageIdx) => (
            <button
              key={pageIdx}
              onClick={() => {
                // Cada “página” começa em (pageIdx * perView)
                const perView =
                  (instanceRef.current?.options.slides &&
                    instanceRef.current.options.slides.perView) ||
                  3;
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

export default Professor;
