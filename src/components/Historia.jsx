import SaibaMaisButton from "./SaibaMaisButton";
import imagemHistoria from "../assets/fotoHistoria.png";

const Historia = () => {
    return (
        <div
            id="historia"
            className="flex flex-col md:flex-row items-center justify-center py-12 md:h-[95vh] relative z-10 bg-[#f8f8f8]"
        >
            {/* Coluna da imagem (manter à esquerda e aumentar levemente) */}
            <div className="md:w-1/2 flex justify-start items-center mb-8">
                <img
                    src={imagemHistoria}
                    alt="fotoHistoria"
                    className="w-[96%] h-auto object-cover z-20 hidden md:block"
                />
            </div>

            {/* Coluna do texto (trazer um pouco mais para a esquerda) */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-center items-center md:items-start px-6 md:px-0 text-left">
                <div className="flex flex-col items-center md:items-start space-y-4 max-w-lg text-sm sm:text-base">
                    <p className="text-[#3970B7] font-bold text-xs uppercase border-b-[2px] border-[#FECB0A] pb-1">
                        Sobre nós
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3970B7]">
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

export default Historia;
