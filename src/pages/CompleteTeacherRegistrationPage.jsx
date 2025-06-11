import { useEffect, useState } from "react";
import { User, GraduationCap, Image, Lock } from "lucide-react";
import NavbarPanel from "../components/NavbarPanel";
import { showAlert } from "../components/ShowAlert";
import { teacherService } from "../services/teacherService";
import ContentTeacherRegistration from "../components/complete-registration/ContentTeacherRestration";

export default function CompleteTeacherRegistrationPage() {
    const [percentComplete, setPercentComplete] = useState(0);
    const [active, setActive] = useState("Informacoes Pessoais");
    const professorId = localStorage.getItem("userId");
    const [formData, setFormData] = useState({
        id: professorId,
        name: "",
        email: "",
        telefone: "",
        dataNascimento: "",
        sobre: "",
        formacao: "",
        experiencia: "",
        materias: "",
        novaSenha: ""
    });

    useEffect(() => {
    async function fetchTeacher() {
        if (professorId) {
            try {
                const data = await teacherService.getById(professorId);
                setFormData({
                    id: data.id,
                    name: data.name || "",
                    email: data.email || "",
                    telefone: data.telefone || "",
                    dataNascimento: data.dataNascimento || "",
                    sobre: data.sobre || "",
                });
            } catch (err) {
                showAlert({
                    title: 'Erro!',
                    text: 'Erro ao carregar dados do professor: ' + err.message,
                    icon: 'error',
                });
            }
        }
    }
    fetchTeacher();
}, [professorId]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleUpdate = async () => {
        try {
            await teacherService.update( formData.id,formData);
            showAlert({
            title: 'Perfil atualizado com sucesso',
            text: `Suas informações foram salvas com sucesso!`,
            icon: 'success',
            });
        } catch (err) {
            showAlert({
            title: 'Erro!',
            text: 'Erro ao atualizar perfil: ' + err.message,
            icon: 'error',
            });
        }
    };
    
    const tabs = [
        { id: "Informacoes Pessoais", label: "Informações Pessoais", icon: User },
        { id: "Qualificacoes", label: "Qualificações", icon: GraduationCap },
        { id: "Foto e Documentos", label: "Foto e Documentos", icon: Image },
        { id: "Seguranca", label: "Segurança", icon: Lock },
    ];

    return (
        <div className="flex flex-col h-screen min-h-screen">

            <NavbarPanel />
            
            <div className="bg-gray-100 flex items-center justify-center p-3 min-h-[88vh]">

                <div className="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto w-full">
                    <div className="flex flex-col justify-between text-center md:text-start mb-4">
                        {/* Progresso */}
                        <div className="flex justify-end items-center mb-2 gap-2">
                            <span className="text-sm font-light text-gray-600">
                                Completar Perfil: {percentComplete}%
                            </span>
                            <div className="text-sm text-white bg-orange-400 py-1 px-2 rounded-lg">
                                {percentComplete === 0 ? "Iniciado" : "Em Progresso"}
                            </div>
                        </div>

                        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
                            Informações do Professor
                        </h1>
                        <p className="text-sm text-gray-600 mb-4">
                            Complete seu perfil para destacar suas qualificações e atrair mais alunos
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-between md:justify-start mb-6">
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
                        <ContentTeacherRegistration 
                        current={active}
                        formData={formData}
                        onChange={handleChange}
                        onSave={handleUpdate} />
                    </main>
                </div>
            </div>
        </div>
    );
}
