import { useState } from "react";
import { User, Image, Users } from "lucide-react";
import ContentStudentRegistration from "../components/complete-registration/ContentStudentRegistration";
import NavbarPanel from "../components/NavbarPanel";

export default function CompleteStudentRegistrationPage() {
    const [percentComplete, setPercentComplete] = useState(0);
    const [active, setActive] = useState("Dados do Aluno");


    const tabs = [
        { id: "Dados do Aluno", label: "Dados do Aluno", icon: User },
        { id: "Responsavel", label: "Responsável", icon: Users },
        { id: "Foto do Aluno", label: "Foto do Aluno", icon: Image },
    ];

    return (
        <div className="flex flex-col h-screen min-h-screen">
            {/* Navbar */}
            <NavbarPanel />
            <div className="bg-gray-100 md:min-h-screen flex items-center justify-center p-3 min-h-[88vh]">

                <div className="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto w-full">
                    <div className="flex flex-col justify-between text-center md:text-start mb-4">
                        {/* Progresso */}
                        <div className="flex justify-end items-center mb-4 gap-2">
                            <span className="text-sm font-light text-gray-600">
                                Completar Perfil: {percentComplete}%
                            </span>
                            <div className="text-sm text-white bg-orange-400 py-1 px-2 rounded-lg">
                                {percentComplete === 0 ? "Iniciado" : "Em Progresso"}
                            </div>
                        </div>

                        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
                            Cadastro do Aluno
                        </h1>
                        <p className="text-sm text-gray-600 mb-4">
                            Preencha as informações do aluno e do responsável para completar o cadastro
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-evenly md:justify-start mb-8">
                        {tabs.map(({ id, label, icon: Icon }) => {
                            const isActive = active === id;

                            return (
                                <button
                                    key={id}
                                    onClick={() => setActive(id)}
                                    className={`flex items-center justify-center cursor-pointer
                                    ${isActive
                                            ? "bg-yellow-400 text-white"
                                            : "bg-white border border-gray-300 text-gray-600"
                                        }
                                    transition-all
                                    w-12 h-12 rounded-md
                                    md:bg-gray-50
                                    md:w-auto md:h-auto md:px-4 md:py-2 md:rounded-b-none md:rounded-t-md
                                    md:border-b-2 md:border-t-0 md:border-l-0 md:border-r-0
                                    md:flex-row md:gap-2
                                    ${isActive && "md:border-b-2 md:border-t-1 md:border-l-1 md:border-r-1 md:border-yellow-500 md:text-yellow-500 md:bg-yellow-50"}
                `}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="hidden md:inline">{label}</span>
                                </button>
                            );
                        })}
                    </div>

                    <main>
                        <ContentStudentRegistration current={active} />
                    </main>
                </div>
            </div>
        </div>
    );
}
