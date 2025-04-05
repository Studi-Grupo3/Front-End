import { useState } from "react";
import imagem from "../assets/logo.svg";
import imagemHome from "../assets/fotoHome.png";
import imagemHistoria from "../assets/fotoHistoria.png";
import imagemSol from "../assets/sol.png";
import imagemDicas from "../assets/imgDicas.png";
import imagemFundamental from "../assets/imagemFundamental.png";
import imagemInfantil from "../assets/imagemInfantil.png";
import imagemMedio from "../assets/imagemMedio.png";
import professorFabio from "../assets/professorFabio.png";
import professororaJuliana from "../assets/professoraJuliana.png";
import botaoProximo from "../assets/botaoProximo.png";
import botaoAnterior from "../assets/botaoAnterior.png";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import "@fontsource/quicksand";

const NavbarHome = () => {
    return (
        <nav className="h-[10vh] bg-[#3A6FD8] text-white flex items-center justify-between px-6 md:px-12 text-lg sm:text-xl font-quicksand">
            <div>
                <img src={imagem} className="h-12 md:h-16" alt="Logo" />
            </div>

            <div className="hidden md:flex flex-row gap-8 text-sm lg:text-base">
                <span className="cursor-pointer hover:underline">Sobre Nós</span>
                <span className="cursor-pointer hover:underline">Planos</span>
                <span className="cursor-pointer hover:underline">Professores</span>
                <span className="cursor-pointer hover:underline">Contato</span>
            </div>

            <div className="flex flex-row gap-4">
                <button className="px-6 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-[#3A6FD8] transition text-sm md:text-base">
                    Entrar →
                </button>
                <button className="px-6 py-2 bg-[#FECB0A] text-black rounded-lg hover:bg-[#E6A809] transition text-sm md:text-base">
                    Cadastre-se →
                </button>
            </div>
        </nav>
    );
};

const Home = () => {
    return (
        <div className="bg-[#3A6FD8] text-white font-quicksand flex justify-between items-center">
            <div className="flex flex-col justify-center items-center">
                <h2 className="font-bold text-6xl">
                    O seu caminho para o sucesso começa aqui!
                </h2>
                <p className="text-2xl">
                    Na Studi, sabemos que cada aluno tem o seu próprio ritmo de aprendizado e desafios únicos.
                </p>
                <div className="flex md:flex-row gap-4 bottom-6 mt-6">
                    <button className="px-6 py-3 bg-[#FECB0A] text-black rounded-lg text-lg font-semibold hover:bg-[#E6A809] transition">
                        Saiba Mais →
                    </button>
                    <button className="px-6 py-3 border border-white text-white rounded-lg text-lg font-semibold hover:bg-white hover:text-[#3A6FD8] transition">
                        📅 Agendar Aula →
                    </button>
                </div>
            </div>

            <img src={imagemHome} alt="fotoHome" className="w-2/3 md:w-1/3 mt-8 md:mt-0" />
        </div>
    );
};

const Historia = () => {
    return (
        <div className="flex items-center justify-between h-[78vh] bg-white px-6 md:px-20">
            {/* Imagem principal (esquerda) */}
            <img
                src={imagemHistoria}
                alt="fotoHome"
                className="w-1/3 sm:w-1/4 md:w-2/5 h-auto mt-10 md:mt-0"
            />

            {/* Texto no centro */}
            <div className="flex flex-col items-start space-y-4 max-w-lg">
                {/* "Sobre nós" em amarelo e destacado */}
                <p className="text-[#FECB0A] font-bold text-xs uppercase">Sobre nós</p>

                {/* "Conheça Nossa História" em azul e maior */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3970B7]">
                    Conheça Nossa História
                </h2>

                {/* Restante do texto em cinza e com fonte Quicksand */}
                <p className="text-gray-600 font-[Quicksand] leading-relaxed">
                    A Studi nasceu com o propósito de oferecer um suporte acadêmico personalizado para alunos que precisam de acompanhamento mais individualizado. Identificamos a necessidade de muitos estudantes de receberem atenção especial para superar desafios e conquistar seus objetivos.

                    Desde o início, nossa missão foi criar um ambiente de aprendizado acolhedor e eficaz, onde cada aluno pudesse se desenvolver no seu próprio ritmo, com professores capacitados e métodos de ensino adaptados às suas necessidades.
                </p>

                {/* Botão Saiba Mais (com mais espaçamento) */}
                <button className="bg-[#FECB0A] text-white w-22 h-10 text-lg rounded-xl font-light hover:bg-[#E6A809] transition-all mt-6">
                    Saiba mais
                </button>
            </div>

            {/* Imagem do Sol à direita */}
            <div className="w-1/3 sm:w-1/4 md:w-1/5 flex justify-end h-[10vh] mr-8">
                <img
                    src={imagemSol}
                    alt="Imagem do Sol"
                    className="w-1/2 sm:w-1/3 md:w-1/4 h-auto"
                />
            </div>
        </div>
    );
};



const Serviços = () => {
    return (
        <div className="flex justify-start pl-12"> {/* Ajustei o padding-left de 8 para 12 */}
            {/* Texto alinhado à esquerda */}
            <div className="max-w-lg text-left">
                <p className="text-yellow-500 font-bold text-lg uppercase">Nosso Serviço</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500">
                    Por que Escolher Nosso Serviço?
                </h2>
                <ul className="text-gray-600 font-[Quicksand] leading-relaxed space-y-4">
                    <li><span className="text-yellow-500 font-bold">①</span> <span className="font-bold">Professores qualificados</span> – Seleção cuidadosa e compromisso com a excelência.</li>
                    <li><span className="text-yellow-500 font-bold">②</span> <span className="font-bold">Flexibilidade de horários</span> – Aulas nos melhores dias e horários para você.</li>
                    <li><span className="text-yellow-500 font-bold">③</span> <span className="font-bold">Seguro e transparente</span> – Pagamentos protegidos e suporte sempre disponível.</li>
                    <li><span className="text-yellow-500 font-bold">④</span> <span className="font-bold">Online ou presencial</span> – Escolha como e onde aprender.</li>
                    <li><span className="text-yellow-500 font-bold">⑤</span> <span className="font-bold">Pais satisfeitos</span> – Alunos evoluindo e notas acima da média.</li>
                </ul>
                <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition">
                    📅 Agendar Aula →
                </button>
            </div>

            {/* Imagem */}
            <div className="flex-1 flex justify-end">
                <img src={imagemDicas} alt="Imagem Dicas" />
            </div>
        </div>
    );
};

const Planos = () => {
    const cards = [
        {
            title: "Ensino Infantil",
            text: "A Studi oferece aulas particulares lúdicas e personalizadas para o Ensino Infantil, estimulando a curiosidade e criatividade das crianças.",
            image: imagemInfantil,
        },
        {
            title: "Ensino Fundamental",
            text: "Neste modelo, as aulas fortalecem a compreensão dos conteúdos e desenvolvem o pensamento crítico e a resolução de problemas.",
            image: imagemFundamental,
        },
        {
            title: "Ensino Médio",
            text: "No Ensino Médio, as aulas particulares preparam para vestibulares e Enem, com revisão de conteúdos e prática de exercícios.",
            image: imagemMedio,
        },
    ];

    return (
        <div className="mb-12"> {/* Adicionado espaçamento inferior */}
            {/* Seção de Introdução */}
            <div className="text-center">
                <p className="text-yellow-400 font-semibold">Planos</p>
                <h2 className="text-blue-500 text-4xl font-bold">Conheça Nossos Planos</h2>
                <p className="text-gray-700 font-semibold">
                    Oferecemos planos adaptados às necessidades de cada nível escolar, com preços acessíveis e conteúdo de qualidade.
                </p>
            </div>

            {/* Container dos Cards */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-blue-600 text-white rounded-2xl shadow-lg p-6 h-90 w-80 relative overflow-hidden transition-transform transform hover:scale-105"
                    >
                        {/* Centralizar a imagem */}
                        <div className="flex justify-center items-center">
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-50 h-35 rounded-lg mb-6"
                            />
                        </div>
                        {/* Título */}
                        <h2 className="text-lg font-bold text-left flexitems-center mt-4">{card.title}</h2>
                        {/* Texto */}
                        <p className="text-sm text-left mt-4">{card.text}</p>
                        {/* Barra inferior decorativa */}
                        <div className="absolute bottom-0 left-50 w-90 bg-yellow-400 h-10 rounded-l-xl"></div>
                        {/* Link Saiba Mais */}
                        <a href="#" className="flex justify-center text-yellow-300 font-bold relative z-10">
                            Saiba Mais &gt;
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};




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
            image: professororaJuliana,
        },
        {
            name: "Carlos Henrique",
            location: "Rio de Janeiro (online/presencial)",
            subject: "Professor(a) de Física",
            description: "Especialista em vestibulares e ENEM",
            image: professorFabio,
        },
        {
            name: "Fernanda Lima",
            location: "Belo Horizonte (disponível online)",
            subject: "Professor(a) de Química",
            description: "Licenciada em Química e atuante no ensino médio",
            image: professororaJuliana,
        },
        {
            name: "João Pedro",
            location: "Curitiba (disponível online)",
            subject: "Professor(a) de Geografia",
            description: "Apaixonado por geopolítica e atualidades",
            image: professorFabio,
        },
    ];

    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        mode: "free-snap",
        slides: {
            perView: 3,
            spacing: 10,
        },
        breakpoints: {
            "(max-width: 1024px)": {
                slides: {
                    perView: 2,
                    spacing: 0,
                },
            },
            "(max-width: 768px)": {
                slides: {
                    perView: 1,
                    spacing: 0,
                },
            },
        },
    });

    const handlePrev = () => {
        if (instanceRef.current) {
            const current = instanceRef.current.track.details.rel;
            instanceRef.current.moveToIdx(current - 3);
        }
    };

    const handleNext = () => {
        if (instanceRef.current) {
            const current = instanceRef.current.track.details.rel;
            instanceRef.current.moveToIdx(current + 3);
        }
    };

    return (
        <div className="px-4 mt-12 flex flex-col items-center justify-center">
            {/* Título */}
            <div className="text-center mb-8 max-w-2xl">
                <p className="text-yellow-400 font-semibold">Encontre seu professor ideal</p>
                <h2 className="text-blue-500 text-4xl font-bold">Conheça Nossos Professores</h2>
                <p className="text-gray-600 font-semibold mt-2">
                    Profissionais qualificados, apaixonados pelo ensino e prontos para ajudar você a alcançar seus objetivos acadêmicos.
                </p>
            </div>
    
            {/* Botões + Slider */}
            <div className="flex justify-between items-center w-full max-w-7xl px-4">
                <button
                    onClick={handlePrev}
                    className="bg-[#FECB0A]-400 hover:bg-[#FECB0A]-500 text-white rounded-full p-3 transition"
                >
                    <img src={botaoAnterior} alt="" />
                </button>
    
                <div className="overflow-hidden flex justify-center w-full max-w-[calc(3*18rem+2*24px)]">
                    <div ref={sliderRef} className="keen-slider flex">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className="keen-slider__slide bg-white rounded-2xl shadow-lg w-72 overflow-hidden border border-gray-200 mx-4"
                            >
                                <img src={card.image} alt={card.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h2 className="text-lg font-bold">{card.name}</h2>
                                    <p className="text-gray-500 text-sm flex items-center mt-1">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        {card.location}
                                    </p>
                                    <p className="text-blue-600 font-semibold mt-2">{card.subject}</p>
                                    <p className="text-gray-600 text-sm mt-2">{card.description}</p>
                                </div>
                                <div className="p-4 border-t border-gray-200">
                                    <button className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition">
                                        📅 Agendar aula →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
    
                <button
                    onClick={handleNext}
                    className="bg-[#FECB0A]-400 hover:bg-[#FECB0A]-500 text-white rounded-full p-3 transition"
                >
                    <img src={botaoProximo} alt="" />
                </button>
            </div>
        </div>
    );
};    



export default function Navbar() {
    return (
        <>
            <div className="bg-[#3970B7] text-white font-quicksand">
                <NavbarHome />
                <Home />
            </div>

            <div className="bg-[#ffffff] text-black font-Quicksand">
                <Historia />
                <Serviços />
                <Planos />
            </div>

            {/* Espaçamento entre os blocos */}
            <div className="h-20" />

            <div className="bg-[#3970B7] text-white font-quicksand">
                <Professor />
            </div>
        </>
    );
};
