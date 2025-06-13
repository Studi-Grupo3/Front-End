import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarPanel from "../components/NavbarPanel";
import ClassDetailsForm from "../components/appointment-class/ClassDetailsForm";
import ClassModelSelection from "../components/appointment-class/ClassModelSelection";
import ProfessorCarouselChoose from "../components/appointment-class/ProfessorCarouselChoose";
import Scheduling from "../components/appointment-class/Scheduling";
import Pagamento from "../components/appointment-class/Payment";

// Define each step with label, component and title
const steps = [
    {
        key: "detalhes",
        label: "Detalhes",
        title: "Detalhes da Aula",
        Component: ClassDetailsForm,
    },
    {
        key: "modelo",
        label: "Modelo de Aula",
        title: "Selecione o modelo de aula",
        Component: ClassModelSelection,
    },
    {
        key: "professor",
        label: "Professor",
        title: "Escolha um professor",
        Component: ProfessorCarouselChoose,
    },
    {
        key: "agendamento",
        label: "Agendamento",
        title: "Escolha data e horário",
        Component: Scheduling,
    },
    {
        key: "pagamento",
        label: "Pagamento",
        title: "Pagamento",
        Component: Pagamento,
    },
];

export default function MultiStepFlowContainer() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        // detalhes
        phase: "",
        subject: "",
        duration: "",
        materials: [],
        // modelo
        classModel: null,
        // professor
        professorId: null,
        // scheduling
        date: null,
        time: null,
        // pagamento - placeholder for payment data
        personal: {},
        endereco: {},
        pagamento: {},
    });

    const Step = steps[currentStep];

    // Handler to update formData from child
    const handleUpdate = (partialData) => {
        setFormData(prev => ({ ...prev, ...partialData }));
    };

    const goNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // final step handled inside Payment component
            navigate('/aluno/concluido');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <NavbarPanel />
            <main className="flex-1 px-4 py-6 max-w-screen-xl mx-auto w-full">
                <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                    {/* Breadcrumb */}
                    <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center">
                            {steps.map((s, idx) => (
                                <li key={s.key} className="flex items-center">
                                    <button
                                        onClick={() => setCurrentStep(idx)}
                                        className={`hover:underline cursor-pointer ${idx === currentStep ? 'font-medium text-[#3970B7]' : ''}`}
                                    >
                                        {s.label}
                                    </button>
                                    {idx < steps.length - 1 && (
                                        <span className="mx-2 text-gray-400">›</span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>

                    {/* Title */}
                    <h1 className="text-xl sm:text-2xl font-bold text-[#3970B7] text-center mb-5">
                        {Step.title}
                    </h1>

                    {/* Dynamic Content: includes its own action buttons */}
                    <Step.Component
                        data={formData}
                        onUpdate={handleUpdate}
                        onNext={goNext}
                    />
                </div>
            </main>
        </div>
    );
}
