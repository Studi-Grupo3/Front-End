// src/pages/StudentInitial.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarPanel from "../components/NavbarPanel";

const TeacherInitial = () => {
    const navigate = useNavigate();
    const [isCadastroCompleto, setIsCadastroCompleto] = useState(false);

    // Mock de carregamento do status de cadastro (delay 5s)
    useEffect(() => {
        const fetchCadastroStatus = async () => {
            const mockResponse = await new Promise((resolve) =>
                setTimeout(() => resolve({ completo: true }))
            );
            setIsCadastroCompleto(mockResponse.completo);
        };
        fetchCadastroStatus();
    }, []);

    // Array de cards, apontando para /agendamentos/gerenciar/:tab em pt-BR
    const items = [
        {
            title: "Completar Cadastro",
            description: isCadastroCompleto
                ? "Seu cadastro está completo."
                : "Seu cadastro ainda está incompleto, finalize-o.",
            buttonLink: isCadastroCompleto
                ? "Verificar Cadastro →"
                : "Completar cadastro →",
            styles: isCadastroCompleto
                ? {
                    bg: "bg-[#F5FFF8]",
                    text: "text-[#22C55E]",
                    button: "text-[#22C55E]",
                }
                : {
                    bg: "bg-[#FFF5F5]",
                    text: "text-[#FF6D0C]",
                    button: "text-[#FF7200]",
                },
            // Rota específica para completar/verificar cadastro
            route: "/professor/completar-cadastro",
            //     isCadastroCompleto
            // ? "/rota-verificar-cadastro"
            // : "/rota-completar-cadastro",
        },
        {
            title: "Aulas",
            description: "Visualize e gerencie suas aulas agendadas.",
            buttonLink: "Ver aulas →",
            styles: {
                bg: "bg-[#EFF6FF]",
                text: "text-[#1E40AF]",
                button: "text-[#2563EB]",
            },
            // Aqui abrimos o Gerenciar Aulas já na aba "próximas laças" em pt-BR
            route: "/professor/aulas",
        },
        {
            title: "Solicitações",
            description: "Visualize as últimas solicitações.",
            buttonLink: "Ver solicitações →",
            styles: {
                bg: "bg-[#FCFDF0]",
                text: "text-[#A39316]",
                button: "text-[#A39316]",
            },
            // Aqui abrimos o Gerenciar Aulas já na aba "calendario" em pt-BR
            route: "/professor/solicitacoes",
        },
    ];

    // Componente interno de Card, agora clicável
    const CardPanelItem = ({ title, description, buttonLink, styles, route }) => {
        return (
            <div
                onClick={() => navigate(route)}
                className={`
          w-full sm:w-[280px] md:w-[300px] lg:w-[320px]
          h-auto rounded-md shadow-md p-5
          ${styles.bg}
          flex flex-col justify-between

          cursor-pointer
          transform transition-transform
          hover:scale-105
          hover:shadow-lg
        `}
            >
                <div>
                    <h2 className={`text-[20px] mb-2 font-semibold ${styles.text}`}>
                        {title}
                    </h2>
                    <p className="text-base text-black">{description}</p>
                </div>
                <span className={`mt-4 font-bold ${styles.button}`}>
                    {buttonLink}
                </span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#F8F8F8] text-[#333] font-sans flex flex-col items-center">
            {/* Navbar */}
            <div className="w-full">
                <NavbarPanel />
            </div>

            {/* Cabeçalho “Painel do Aluno” */}
            <div className="flex justify-center items-center w-full h-[100px] text-center px-4">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                    Painel do Professor
                </h1>
            </div>

            {/* Conteúdo principal */}
            <div className="flex justify-center w-full px-4">
                <div className="bg-white rounded-lg shadow-md p-5 w-full max-w-6xl">
                    <h1 className="text-xl md:text-2xl font-bold text-black mb-4">
                        Bem-vindo(a) ao Painel do Professor
                    </h1>

                    <p className="text-sm md:text-base text-black mb-6">
                        Aqui você pode completar seu cadastro, gerenciar suas aulas e verificar solicitações.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {items.map((item, index) => (
                            <CardPanelItem
                                key={index}
                                title={item.title}
                                description={item.description}
                                buttonLink={item.buttonLink}
                                styles={item.styles}
                                route={item.route}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherInitial;
