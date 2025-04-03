import { useState } from "react";
import imagem from "../assets/logo.svg";
import imagemHome from "../assets/fotoHome.png";
import imagemHistoria from "../assets/fotoHistoria.png";
import imagemSol from "../assets/sol.png";
import imagemDicas from "../assets/imgDicas.png";

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
        <div className="bg-[#3A6FD8] text-white font-quicksand flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12">
            <div className="max-w-lg text-center md:text-left">
                <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-4">
                    O seu caminho para o sucesso começa aqui!
                </h2>
                <p className="text-lg md:text-xl mb-6">
                    Na Studi, sabemos que cada aluno tem o seu próprio ritmo de aprendizado e desafios únicos.
                </p>
                <div className="flex flex-col md:flex-row gap-4">
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
        <div className="flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-12 gap-8">
            {/* Texto alinhado com a imagem */}
            <div className="max-w-lg text-left flex-1">
                <p className="text-yellow-500 font-bold text-lg uppercase">Nosso Serviço</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500 mb-4">
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
            <div className="flex-1 flex justify-end w-auto h-auto">
                <img src={imagemDicas} alt="Imagem Dicas" />
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

            <div className="bg-[#ffff] text-black font-Quicksand">
                <Historia />
                <Serviços />
            </div>
        </>
    );
}