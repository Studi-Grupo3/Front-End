import React, { useState } from "react";
import ProfessorCard from "./ProfessorCard";

const ProfessorsCarouselHome = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardsPerPage = 3;

  const nextSlide = () => {
    if (currentIndex + cardsPerPage < cards.length) {
      setCurrentIndex(currentIndex + cardsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex - cardsPerPage >= 0) {
      setCurrentIndex(currentIndex - cardsPerPage);
    }
  };

  // Slice the cards to show only the ones in the current "page"
  const visibleCards = cards.slice(currentIndex, currentIndex + cardsPerPage);

  return (
    <div className="relative w-full flex flex-col items-center mt-10">
      {/* Carousel Title Section (optional) */}
      <div className="text-center mb-10">
        <h2 className="text-yellow-400 font-bold text-sm">Encontre seu professor ideal</h2>
        <h1 className="text-white text-4xl font-extrabold mt-2">Conheça Nossos Professores</h1>
        <p className="text-white mt-4 max-w-xl mx-auto text-sm">
          Profissionais qualificados, apaixonados pelo ensino e prontos para ajudar você a alcançar seus objetivos acadêmicos.
        </p>
      </div>

      {/* Cards */}
      <div className="flex items-center justify-center w-full relative">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded-full shadow-md z-10"
        >
          ←
        </button>

        {/* Cards Container */}
        <div className="flex justify-center gap-8 overflow-hidden w-[85%]">
          {visibleCards.map((professor, index) => (
            <div key={index} className="flex-shrink-0 w-[300px]">
              <ProfessorCard professor={professor} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded-full shadow-md z-10"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default ProfessorsCarouselHome;