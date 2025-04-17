import NavbarHome from "../components/NavbarHome";
import imagemHome from "../assets/fotoHome.png";
import imagemHistoria from "../assets/fotoHistoria.png";
import imagemDicas from "../assets/imgDicas.png";
import imagemFundamental from "../assets/imagemFundamental.png";
import imagemInfantil from "../assets/imagemInfantil.png";
import imagemMedio from "../assets/imagemMedio.png";

import localizacao from "../assets/localização.png";
import telefoneIcon from "../assets/telefone.png";
import email from "../assets/email.png";
import logo2 from "../assets/logo2.png";

import CardProfessor from "../components/CardProfessor";


import "keen-slider/keen-slider.min.css";

import SaibaMaisButton from "../components/SaibaMaisButton";
import AgendarAulaButton from "../components/AgendarAulaButton";

const HomeSection = () => {
    return (
        <div id="home" className="w-full bg-[#3A6FD8] text-white font-quicksand flex flex-col md:flex-row items-center relative px-14 sm:px-6 md:px-12 py-12 h-[60vh] md:h-[70vh] overflow-hidden">
            <div className="flex flex-col justify-center items-start text-left max-w-xl z-10 w-full">
                <h2 className="font-bold text-2xl sm:text-3xl md:text-5xl">
                    O seu caminho para o sucesso começa aqui!
                </h2>
                <p className="text-sm sm:text-base md:text-lg mt-4">
                    Na Studi, sabemos que cada aluno tem o seu próprio ritmo de aprendizado e desafios únicos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <SaibaMaisButton />
                    <AgendarAulaButton />
                </div>
            </div>

            <img
                src={imagemHome}
                alt="fotoHome"
                className="hidden md:block absolute right-0 bottom-0 max-w-[35%] h-auto object-contain"
            />
        </div>
    );
};


const Historia = () => {
    return (
        <div id="historia" className="flex flex-col md:flex-row items-center justify-center py-12 md:h-[95vh] relative z-10">
            <div className="md:w-1/2 flex justify-start items-center mb-8">
                <img
                    src={imagemHistoria}
                    alt="fotoHistoria"
                    className="w-[90%] h-auto object-cover z-20 hidden md:block"
                />
            </div>

            <div className="w-full md:w-1/2 flex justify-center md:justify-start items-center md:items-start px-6 md:px-0 text-left">
                <div className="flex flex-col items-center md:items-start space-y-4 max-w-lg text-sm sm:text-base">
                    <p className="text-[#FECB0A] font-bold text-xs uppercase">Sobre nós</p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3A6FD8]">
                        Conheça Nossa História
                    </h2>
                    <p className="text-gray-600 font-[Quicksand] leading-relaxed">
                        A Studi nasceu com o propósito de oferecer um suporte acadêmico personalizado para alunos que precisam de acompanhamento mais individualizado. Identificamos a necessidade de muitos estudantes de receberem atenção especial para superar desafios e conquistar seus objetivos.
                        <br /><br />
                        Desde o início, nossa missão foi criar um ambiente de aprendizado acolhedor e eficaz, onde cada aluno pudesse se desenvolver no seu próprio ritmo, com professores capacitados e métodos de ensino adaptados às suas necessidades.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <SaibaMaisButton />
                    </div>

                </div>
            </div>
        </div>
    );
};

const Serviços = () => {
    return (
        <div id="serviços" className="flex flex-col md:flex-row items-center justify-center py-2 md:h-[95vh] relative z-10">
            <div className="w-full md:w-1/2 flex flex-col justify-center max-w-xl z-10 text-left px-6 md:ml-12 md:px-0 md:items-start items-center">
                <p className="text-[#FECB0A] font-bold">Nosso Serviço</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3A6FD8]">
                    Por que Escolher Nosso Serviço?
                </h2>
                <ul className="text-gray-600 leading-relaxed mt-4 space-y-2">
                    <li><span className="text-[#FECB0A] font-bold">①</span> <strong>Professores qualificados</strong> – Seleção cuidadosa e compromisso com a excelência.</li>
                    <li><span className="text-[#FECB0A] font-bold">②</span> <strong>Flexibilidade de horários</strong> – Aulas nos melhores dias e horários para você.</li>
                    <li><span className="text-[#FECB0A] font-bold">③</span> <strong>Seguro e transparente</strong> – Pagamentos protegidos e suporte sempre disponível.</li>
                    <li><span className="text-[#FECB0A] font-bold">④</span> <strong>Online ou presencial</strong> – Escolha como e onde aprender.</li>
                    <li><span className="text-[#FECB0A] font-bold">⑤</span> <strong>Pais satisfeitos</strong> – Alunos evoluindo e notas acima da média.</li>
                </ul>
                <button className="mt-6 px-6 py-3 bg-[#3A6FD8] text-white rounded-lg text-base font-semibold hover:bg-blue-600 transition">
                    📅 Agendar Aula →
                </button>
            </div>

            <div className="hidden md:flex justify-end items-center mb-8 w-full">
                <img
                    src={imagemDicas}
                    alt="Imagem Dicas"
                    className="w-[70%] h-auto object-cover z-20"
                />
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
        <div id="planos" className="pt-2 px-6 mb-12">
            <div className="text-center">
                <p className="text-[#FECB0A] font-semibold">Planos</p>
                <h2 className="text-[#3A6FD8] text-4xl font-bold">Conheça Nossos Planos</h2>
                <p className="text-gray-700 font-semibold">
                    Oferecemos planos adaptados às necessidades de cada nível escolar, com preços acessíveis e conteúdo de qualidade.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-8">
                {cards.map((card, index) => (
                    <div key={index} className="bg-[#3A6FD8] text-white rounded-2xl shadow-lg p-6 h-100 w-75 relative overflow-hidden transition-transform transform hover:scale-105">
                        <div className="flex justify-center items-center">
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-50 h-35 rounded-lg mb-6"
                            />
                        </div>
                        <h2 className="text-lg font-bold text-left mt-4">{card.title}</h2>
                        <p className="text-sm text-left mt-4">{card.text}</p>

                        <svg
                            className="absolute bottom-0 right-0"
                            width="100"
                            height="100"
                            viewBox="0 0 120 120"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M0 120C0 53.7258 53.7258 0 120 0V120H0Z" fill="#FECB0A" />
                        </svg>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Professor = () => {
    return (
        <div id="professores">
            <CardProfessor />
        </div>
    );
};

const FaleConosco = () => {
    return (
        <div id="contato" className="min-h-[90vh] flex flex-col items-center justify-center bg-gray-50 px-4">
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
                
                <div className="flex flex-col items-center mt-6">
                    <div className="flex items-center gap-2 mb-4">
                        <img src={logo2} alt="Logo" className="h-35" />
                    </div>

                </div>

                <div className="flex flex-col items-center mt-6">
                    <h4 className="text-lg font-bold mb-2 border-b border-yellow-300 inline-block">Links Rápidos</h4>
                    <ul className="space-y-2 mt-3">
                        <li><a href="#" className="hover:text-yellow-300">Sobre Nós</a></li>
                        <li><a href="#" className="hover:text-yellow-300">Planos</a></li>
                        <li><a href="#" className="hover:text-yellow-300">Professores</a></li>
                        <li><a href="#" className="hover:text-yellow-300">Cadastre-se</a></li>
                    </ul>
                </div>

                
                <div className="flex flex-col items-center mt-6">
                    <h4 className="text-lg font-bold mb-2 border-b border-yellow-300 inline-block">Áreas De Ensino</h4>
                    <ul className="space-y-2 mt-3">
                        <li className="hover:text-yellow-300 cursor-pointer">E. Fundamental</li>
                        <li className="hover:text-yellow-300 cursor-pointer">E. Fundamental 2</li>
                        <li className="hover:text-yellow-300 cursor-pointer">E. Médio</li>
                        <li className="hover:text-yellow-300 cursor-pointer">Vestibulares</li>
                    </ul>
                </div>

                
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

export default function Home() {
    return (
        <>
            
            <NavbarHome />

            
            <div className="bg-[#3A6FD8] text-white font-quicksand">
                <HomeSection />
            </div>

            <div className="bg-[#ffffff] text-black font-Quicksand">
                <Historia />
                <Serviços />
                <Planos />
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