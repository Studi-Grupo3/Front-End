import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import professorFabio from "../assets/professorFabio.png";
import professoraJuliana from "../assets/professoraJuliana.png";
import botaoAnterior from "../assets/botaoAnterior.png";
import botaoProximo from "../assets/botaoProximo.png";

const ProfessorsSectionHome = () => {
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

    const [currentSlide, setCurrentSlide] = useState(0);

    const [sliderRef, instanceRef] = useKeenSlider({
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
        <div className="px-4 mt-12 flex flex-col items-center justify-center min-h-screen">
            <div className="text-center mb-8 max-w-2xl">
                <p className="text-yellow-400 font-semibold">Encontre seu professor ideal</p>
                <h2 className="text-[#ffffff] text-4xl font-bold">Conheça Nossos Professores</h2>
                <p className="text-gray-600 font-semibold mt-2">
                    Profissionais qualificados, apaixonados pelo ensino e prontos para ajudar você a alcançar seus objetivos acadêmicos.
                </p>
            </div>

            <div className="flex justify-between items-center w-full max-w-7xl px-4">
                <button onClick={handlePrev} className="mx-4 md:mx-6">
                    <img src={botaoAnterior} alt="Anterior" />
                </button>

                <div className="overflow-hidden w-full">
                    <div ref={sliderRef} className="keen-slider">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className="keen-slider__slide bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col"
                            >
                                <div className="w-full max-w-sm mx-auto flex flex-col h-full">
                                    <img src={card.image} alt={card.name} className="w-full h-48 object-cover rounded-t-2xl" />
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
    );
};

export default ProfessorsSectionHome;
