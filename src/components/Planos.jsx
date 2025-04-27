import imagemFundamental from "../assets/imagemFundamental.png";
import imagemInfantil from "../assets/imagemInfantil.png";
import imagemMedio from "../assets/imagemMedio.png";

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
                    <div
                        key={index}
                        className="bg-[#3A6FD8] text-white rounded-2xl shadow-lg p-6 h-100 w-75 relative overflow-hidden flex flex-col transition-transform transform hover:scale-105"
                    >
                        <div className="flex justify-center items-center">
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-50 h-35 rounded-lg mb-6"
                            />
                        </div>
                        <h2 className="text-lg font-bold text-left mt-4">{card.title}</h2>
                        <p className="text-sm text-left mt-4">{card.text}</p>
                        <a
                            href="#"
                            className="text-[#FECB0A] font-semibold hover:underline mt-auto text-center"
                        >
                            Saiba Mais
                        </a>
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
export default Planos; 