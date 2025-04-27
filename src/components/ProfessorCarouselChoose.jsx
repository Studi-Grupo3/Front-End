import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ProfessorCard from "./ProfessorCard";

import arrowPrev from "../assets/botaoAnterior.png";
import arrowNext from "../assets/botaoProximo.png";

export default function ProfessorsCarouselChoose({ cards }) {
  if (!cards?.length) return null;

  const [ref, slider] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: { perView: 3, spacing: 16 }, // Tighter spacing for ChooseProfessor
    breakpoints: {
      "(max-width: 1024px)": { slides: { perView: 2, spacing: 14 } },
      "(max-width: 768px)": { slides: { perView: 1, spacing: 10 } },
    },
  });

  const next = () => slider.current?.next();
  const prev = () => slider.current?.prev();
  const busy = slider.current?.animating;

  return (
    <div className="relative w-full">
      {/* Arrows */}
      <button
        onClick={prev}
        disabled={busy}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
      >
        <img src={arrowPrev} alt="Anterior" />
      </button>

      <button
        onClick={next}
        disabled={busy}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
      >
        <img src={arrowNext} alt="Próximo" />
      </button>

      {/* Slider */}
      <div ref={ref} className="keen-slider px-6">
        {cards.map((c) => (
          <div
            key={c.id || c.name}
            className="keen-slider__slide flex justify-center !overflow-visible"
          >
            <div className="w-full max-w-[320px] sm:max-w-[340px]">
              <ProfessorCard {...c} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
