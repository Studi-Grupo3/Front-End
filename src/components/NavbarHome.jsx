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
import localizacao from "../assets/localização.png";
import telefoneIcon from "../assets/telefone.png";
import email from "../assets/email.png";
import logo2 from "../assets/logo2.png";




import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import "@fontsource/quicksand";

const NavbarHome = () => {
    return (
        <nav className="h-[10vh] bg-[#3A6FD8] text-white flex items-center justify-between px-6 md:px-12 text-lg sm:text-xl font-quicksand">
            <div>
                <img src={imagem} className="h-30" alt="Logo" />
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
        <div className="bg-[#3A6FD8] h-110 text-white font-quicksand flex items-center">
            <div className="flex flex-col justify-center items-start text-left">
                <h2 className="font-bold text-5xl">
                    O seu caminho para o sucesso começa aqui!
                </h2>
                <p className="text-1xl mt-4">
                    Na Studi, sabemos que cada aluno tem o seu próprio ritmo de aprendizado e desafios únicos.
                </p>
                <div className="flex md:flex-row gap-4 mt-6">
                    <button className="px-6 py-3 bg-[#FECB0A] text-black rounded-lg text-lg font-semibold hover:bg-[#E6A809] transition">
                        Saiba Mais →
                    </button>
                    <button className="px-6 py-3 border border-white text-white rounded-lg text-lg font-semibold hover:bg-white hover:text-[#3A6FD8] transition">
                        📅 Agendar Aula →
                    </button>
                </div>
            </div>
            <img src={imagemHome} alt="fotoHome" className="absolute right-0 top-20 w-2/3 md:w-1/3" />
        </div>
    );
};


const Historia = () => {
    return (
        <div className="flex items-center justify-between h-[78vh] bg-white px-6 md:px-20">
            <img
                src={imagemHistoria}
                alt="fotoHome"
                className="w-1/3 sm:w-1/4 md:w-2/5 h-auto mt-10 md:mt-0"
            />

            <div className="flex flex-col items-start space-y-4 max-w-lg">
                <p className="text-[#FECB0A] font-bold text-xs uppercase">Sobre nós</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3A6FD8]">
                    Conheça Nossa História
                </h2>
                <p className="text-gray-600 font-[Quicksand] leading-relaxed">
                    A Studi nasceu com o propósito de oferecer um suporte acadêmico personalizado para alunos que precisam de acompanhamento mais individualizado. Identificamos a necessidade de muitos estudantes de receberem atenção especial para superar desafios e conquistar seus objetivos.

                    Desde o início, nossa missão foi criar um ambiente de aprendizado acolhedor e eficaz, onde cada aluno pudesse se desenvolver no seu próprio ritmo, com professores capacitados e métodos de ensino adaptados às suas necessidades.
                </p>
                <button className="bg-[#FECB0A] text-white w-22 h-10 text-lg rounded-xl font-light hover:bg-[#E6A809] transition-all mt-6">
                    Saiba mais
                </button>
            </div>

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
        <div className="bg-white h-[58vh] flex items-center justify-between px-20">
            {/* Texto */}
            <div className="flex flex-col items-start justify-center max-w-[70vw]">
                <p className="text-yellow-500 font-bold">Nosso Serviço</p>
                <h2 className="text-2xl md:text-4xl font-bold text-[#3A6FD8]">
                    Por que Escolher Nosso Serviço?
                </h2>
                <ul className="text-gray-600 leading-relaxed  mt-4 space-y-2">
                    <li><span className="text-yellow-500 font-bold">①</span> <span className="font-bold">Professores qualificados</span> – Seleção cuidadosa e compromisso com a excelência.</li>
                    <li><span className="text-yellow-500 font-bold">②</span> <span className="font-bold">Flexibilidade de horários</span> – Aulas nos melhores dias e horários para você.</li>
                    <li><span className="text-yellow-500 font-bold">③</span> <span className="font-bold">Seguro e transparente</span> – Pagamentos protegidos e suporte sempre disponível.</li>
                    <li><span className="text-yellow-500 font-bold">④</span> <span className="font-bold">Online ou presencial</span> – Escolha como e onde aprender.</li>
                    <li><span className="text-yellow-500 font-bold">⑤</span> <span className="font-bold">Pais satisfeitos</span> – Alunos evoluindo e notas acima da média.</li>
                </ul>
                <button className="mt-6 px-6 py-3 bg-[#3A6FD8] text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition">
                    📅 Agendar Aula →
                </button>
            </div>

            {/* Imagem */}
            <div className="hidden md:block">
                <img src={imagemDicas} alt="Imagem Dicas" className="w-[500px] h-auto" />
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
        <div className="mb-12">
            <div className="text-center">
                <p className="text-yellow-400 font-semibold">Planos</p>
                <h2 className="text-[#3A6FD8] text-4xl font-bold">Conheça Nossos Planos</h2>
                <p className="text-gray-700 font-semibold">
                    Oferecemos planos adaptados às necessidades de cada nível escolar, com preços acessíveis e conteúdo de qualidade.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-8">
                {cards.map((card, index) => (
                    <div key={index} className="bg-[#3A6FD8] text-white rounded-2xl shadow-lg p-6 h-90 w-80 relative overflow-hidden transition-transform transform hover:scale-105">
                        <div className="flex justify-center items-center">
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-50 h-35 rounded-lg mb-6"
                            />
                        </div>
                        <h2 className="text-lg font-bold text-left mt-4">{card.title}</h2>
                        <p className="text-sm text-left mt-4">{card.text}</p>

                        {/* SVG com a curva no canto inferior direito */}
                        <svg
                          className="absolute bottom-0 right-0"
                          width="100"
                          height="100"
                          viewBox="0 0 120 120"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 120C0 53.7258 53.7258 0 120 0V120H0Z" fill="#FFD400" />
                        </svg>

                        <a href="#" className="flex justify-center text-yellow-300 font-bold relative z-10 mt-4">
                            Saiba Mais &gt;
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Espaco = () => {
    return (

        <div >
            .
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
        <div className="px-4 mt-12 flex flex-col items-center justify-center min-h-screen">
            <div className="text-center mb-8 max-w-2xl">
                <p className="text-yellow-400 font-semibold">Encontre seu professor ideal</p>
                <h2 className="text-[#ffffff] text-4xl font-bold">Conheça Nossos Professores</h2>
                <p className="text-gray-600 font-semibold mt-2">
                    Profissionais qualificados, apaixonados pelo ensino e prontos para ajudar você a alcançar seus objetivos acadêmicos.
                </p>
            </div>

            <div className="flex justify-between items-center w-full max-w-7xl px-4">
                <button
                    onClick={handlePrev}
                    className="bg-[#FECB0A] hover:bg-[#E6A809] text-white rounded-full p-3 transition"
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
                                    <p className="text-[#3A6FD8] font-semibold mt-2">{card.subject}</p>
                                    <p className="text-gray-600 text-sm mt-2">{card.description}</p>
                                </div>
                                <div className="p-4 border-t border-gray-200">
                                    <button className="w-full py-2 bg-[#3A6FD8] text-white font-bold rounded-lg hover:bg-blue-600 transition">
                                        📅 Agendar aula →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleNext}
                    className="bg-[#FECB0A] hover:bg-[#E6A809] text-white rounded-full p-3 transition"
                >
                    <img src={botaoProximo} alt="" />
                </button>
            </div>
        </div>
    );
};



const FaleConosco = () => {
    return (
        <div className="min-h-[90vh] flex flex-col items-center justify-center bg-gray-50 px-4">
            <h2 className="text-3xl font-bold text-blue-600 mb-2">Fale Conosco</h2>
            <p className="text-center text-gray-600 mb-8">
                Tem dúvidas ou quer saber mais sobre nossos serviços?<br />
                Entre em contato conosco!
            </p>

            <form className="w-full max-w-md space-y-4">
                <div>
                    <label className="block mb-1 text-gray-700">Nome</label>
                    <input
                        type="text"
                        placeholder="Seu nome completo"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-gray-700">E-mail</label>
                    <input
                        type="email"
                        placeholder="seu@email.com"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-gray-700">Celular</label>
                    <input
                        type="text"
                        placeholder="(00) 00000-0000"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-gray-700">Mensagem</label>
                    <textarea
                        placeholder="Escreva sua mensagem aqui..."
                        className="w-full border border-gray-300 rounded-md px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-40 bg-yellow-400 text-black font-semibold py-2 rounded-md hover:bg-yellow-500 transition"
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    );
};


const Footer = () => {
    return (
        <footer >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-[17px] text-center">
                {/* Logo e redes sociais */}
                <div className="flex flex-col items-center mt-6">
                    <div className="flex items-center gap-2 mb-4">
                        <img src={logo2} alt="Logo" className="h-35" />
                    </div>

                </div>

                {/* Links rápidos */}
                <div className="flex flex-col items-center mt-6">
                    <h4 className="text-lg font-bold mb-2 border-b border-yellow-300 inline-block">Links Rápidos</h4>
                    <ul className="space-y-2 mt-3">
                        <li><a href="#" className="hover:text-yellow-300">Sobre Nós</a></li>
                        <li><a href="#" className="hover:text-yellow-300">Planos</a></li>
                        <li><a href="#" className="hover:text-yellow-300">Professores</a></li>
                        <li><a href="#" className="hover:text-yellow-300">Cadastre-se</a></li>
                    </ul>
                </div>

                {/* Áreas de Ensino */}
                <div className="flex flex-col items-center mt-6">
                    <h4 className="text-lg font-bold mb-2 border-b border-yellow-300 inline-block">Áreas De Ensino</h4>
                    <ul className="space-y-2 mt-3">
                        <li className="hover:text-yellow-300 cursor-pointer">E. Fundamental</li>
                        <li className="hover:text-yellow-300 cursor-pointer">E. Fundamental 2</li>
                        <li className="hover:text-yellow-300 cursor-pointer">E. Médio</li>
                        <li className="hover:text-yellow-300 cursor-pointer">Vestibulares</li>
                    </ul>
                </div>

                {/* Contato */}
                <div className="flex flex-col items-center mt-6">
                    <h4 className="text-lg font-bold mb-2 border-b border-yellow-300 inline-block">Contato</h4>
                    <ul className="space-y-3 mt-3">
                        <li className="flex items-center justify-center gap-2 hover:text-yellow-300 cursor-pointer">
                            <img src={localizacao} alt="Localização" className="w-5 h-5" />
                            <span>6391 Elgin St. Celina, Delaware 10299</span>
                        </li>
                        <li className="flex items-center justify-center gap-2 hover:text-yellow-300 cursor-pointer">
                            <img src={telefoneIcon} alt="Telefone" className="w-5 h-5" />
                            <span>(303) 555-0105</span>
                        </li>
                        <li className="flex items-center justify-center gap-2 hover:text-yellow-300 cursor-pointer">
                            <img src={email} alt="Email" className="w-5 h-5" />
                            <span>michael.mitc@example.com</span>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};




export default function Navbar() {
    return (
        <>
            <div className="bg-[#3A6FD8] text-white font-quicksand">
                <NavbarHome />
                <Home />
            </div>

            <div className="bg-[#ffffff] text-black font-Quicksand">
                <Historia />
                <Serviços />
                <Planos />
                
            </div>
            <div className="bg-[#ffffff] h-20 text-white font-Quicksand">
                <Espaco/>        
            </div>


            <div className="bg-[#3A6FD8] text-white font-quicksand">
                <Professor />
            </div>

            <div className="bg-[#ffffff] text-black font-quicksand">
                <FaleConosco />
            </div>

            <div className="bg-[#3A6FD8] text-white font-quicksand">
                <Footer />
            </div>

        </>
    );
}
