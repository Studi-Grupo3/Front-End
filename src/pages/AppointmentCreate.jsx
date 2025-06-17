import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarPanel from "../components/NavbarPanel";
import ClassDetailsForm from "../components/appointment-class/ClassDetailsForm";
import ClassModelSelection from "../components/appointment-class/ClassModelSelection";
import ProfessorCarouselChoose from "../components/appointment-class/ProfessorCarouselChoose";
import Scheduling from "../components/appointment-class/Scheduling";
import Pagamento from "../components/appointment-class/Payment";

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
        phase: "",
        subject: "",
        duration: "",
        materials: [],
        classModel: null,
        professorId: null,
        date: null,
        time: null,
        personal: {},
        endereco: {},
        pagamento: {},
    });

    const Step = steps[currentStep];

    const handleUpdate = (partialData) => {
        setFormData(prev => ({ ...prev, ...partialData }));
    };

    const goNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // roteamento final é feito em Pagamento via onNext
            navigate('/aluno/concluido');
        }
    };

    // Exemplo de cálculo de total; adapte conforme regra de negócio:
    const calculateTotal = (data) => {
      // Exemplo: R$ 50 por hora online, R$ 70 por hora presencial
      const rateOnline = 50;
      const rateHome = 70;
      const parseDurationToHours = (str) => {
        let hours = 0, minutes = 0;
        const horaMatch = str.match(/(\d+)\s*hora/);
        if (horaMatch) hours = parseInt(horaMatch[1], 10);
        const minMatch = str.match(/(\d+)\s*min/);
        if (minMatch) minutes = parseInt(minMatch[1], 10);
        return hours + minutes / 60;
      };
      const dur = data.duration ? parseDurationToHours(data.duration) : 0;
      if (!data.classModel) return 0;
      return data.classModel === 'home' ? rateHome * dur : rateOnline * dur;
    };

    // Ao entrar no passo de pagamento, calculamos e armazenamos totalValue
    useEffect(() => {
      if (currentStep === steps.length - 1) {
        const total = calculateTotal(formData);
        setFormData(prev => ({
          ...prev,
          pagamento: {
            ...prev.pagamento,
            totalValue: total,
          }
        }));
      }
    }, [currentStep]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <NavbarPanel />
            <main className="flex-1 px-4 py-6 max-w-screen-xl mx-auto w-full">
                <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                    <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center">
                            {steps.map((s, idx) => (
                                <li key={s.key} className="flex items-center">
                                    <button
                                        onClick={() => {
                                          // só permite navegar para etapas já alcançadas ou a atual
                                          if (idx <= currentStep) {
                                            setCurrentStep(idx);
                                          }
                                        }}
                                        className={`hover:underline cursor-pointer ${
                                          idx === currentStep ? 'font-medium text-[#3970B7]' : (idx < currentStep ? '' : 'text-gray-400')
                                        }`}
                                        disabled={idx > currentStep}
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

                    <h1 className="text-xl sm:text-2xl font-bold text-[#3970B7] text-center mb-5">
                        {Step.title}
                    </h1>

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
