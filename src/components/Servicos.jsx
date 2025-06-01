import imagemDicas from "../assets/imagemDicas.png";

const Serviços = () => {
    return (
        <div
            id="serviços"
            className="flex flex-col md:flex-row items-center justify-center py-2 md:h-[95vh] relative z-10 bg-[#F8F8F8] pl-30"
        >
            <div className="w-full md:w-1/2 flex flex-col justify-center max-w-xl z-10 text-left px-6 md:ml-12 md:px-0 md:items-start items-center">
                {/* “Nosso Serviço” em azul com borda inferior amarela mais fina */}
                <p className="text-[#3970B7] font-bold border-b-2 border-[#FECB0A] w-fit">
                    Nosso Serviço
                </p>

                <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-[#3970B7]">
                    Por que Escolher Nosso Serviço?
                </h2>

                <ul className="text-gray-600 leading-relaxed mt-4 space-y-3">
                    <li className="flex items-start gap-3">
                        {/* Círculo perfeito com w-6 h-6 + text-xs + flex centering */}
                        <span className="bg-[#FECB0A] text-black font-bold rounded-full w-9 h-6 flex items-center justify-center text-xs">
                            1
                        </span>
                        <span>
                            <strong className="text-[#3970B7]">
                                Professores qualificados
                            </strong>{" "}
                            – Seleção cuidadosa e compromisso com a excelência.
                        </span>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="bg-[#FECB0A] text-black font-bold rounded-full w-8 h-6 flex items-center justify-center text-xs">
                            2
                        </span>
                        <span>
                            <strong className="text-[#3970B7]">
                                Flexibilidade de horários
                            </strong>{" "}
                            – Aulas nos melhores dias e horários para você.
                        </span>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="bg-[#FECB0A] text-black font-bold rounded-full w-9 h-6 flex items-center justify-center text-xs">
                            3
                        </span>
                        <span>
                            <strong className="text-[#3970B7]">
                                Seguro e transparente
                            </strong>{" "}
                            – Pagamentos protegidos e suporte sempre disponível.
                        </span>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="bg-[#FECB0A] text-black font-bold rounded-full w-6.5 h-6 flex items-center justify-center text-xs">
                            4
                        </span>
                        <span>
                            <strong className="text-[#3970B7]">
                                Online ou presencial
                            </strong>{" "}
                            – Escolha como e onde aprender.
                        </span>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="bg-[#FECB0A] text-black font-bold rounded-full w-6.5 h-6 flex items-center justify-center text-xs">
                            5
                        </span>
                        <span>
                            <strong className="text-[#3970B7]">
                                Pais satisfeitos
                            </strong>{" "}
                            – Alunos evoluindo e notas acima da média.
                        </span>
                    </li>
                </ul>

                <button className="mt-6 px-6 py-3 bg-[#3970B7] text-white rounded-lg text-base font-semibold hover:bg-blue-600 transition cursor-pointer">
                    📅 Agendar Aula →
                </button>
            </div>

            <div className="hidden md:flex justify-end items-center mb-8 w-full">
                <img
                    src={imagemDicas}
                    alt="Imagem Dicas"
                    className="w-[80%] h-auto object-cover z-20"
                />
            </div>
        </div>
    );
};

export default Serviços;
