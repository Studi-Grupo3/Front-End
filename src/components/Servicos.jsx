import imagemDicas from "../assets/imagemDicas.png";

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
export default Serviços;