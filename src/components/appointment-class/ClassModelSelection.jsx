import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Laptop, MapPin } from "lucide-react";

export default function ClassModelSelection() {
    const navigate = useNavigate();
    const [choice, setChoice] = useState(null);        // "online" | "home"

    /* quick helpers for styling */
    const base = "w-full sm:w-80 border rounded-lg px-8 py-10 transition-colors cursor-pointer flex flex-col items-center text-center";
    const def = "border-gray-300 hover:border-blue-500";
    const active = "border-blue-500 shadow-[0_0_0_2px_rgba(30,102,255,0.25)]";
    const radio = (sel) =>
        `flex items-center justify-center w-5 h-5 rounded-full border-2 mb-4 ${sel ? "border-blue-500 bg-blue-500" : "border-blue-500"
        }`;

    return (
        <main className="flex flex-col min-h-screen bg-gray-50">
            <section className="flex-grow flex items-center justify-center p-6">
                <div className="max-w-4xl w-full bg-white border border-gray-200 rounded-xl p-8 md:p-12 shadow-sm">
                    {/* breadcrumb */}
                    <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
                        <button
                            onClick={() => navigate("/")}           // ← back to Details page
                            className="hover:underline cursor-pointer"
                        >
                            Detalhes
                        </button>
                        <span className="mx-1">›</span>
                        <span className="text-blue-600 font-medium">Modelo de Aula</span>
                    </nav>

                    <h1 className="text-xl sm:text-2xl font-semibold text-blue-600 text-center mb-10">
                        Selecione o modelo de aula
                    </h1>

                    {/* option cards */}
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center">
                        {/* ONLINE */}
                        <div
                            onClick={() => setChoice("online")}
                            className={`${base} ${choice === "online" ? active : def}`}
                        >
                            <span className={radio(choice === "online")} />
                            <Laptop className="w-10 h-10 text-blue-600 mb-4" />
                            <h2 className="font-semibold mb-2">Online</h2>
                            <p className="text-gray-600 text-sm mb-4">
                                Aulas ao vivo pela internet com nossos professores qualificados.
                                Acesse de qualquer lugar.
                            </p>
                            <ul className="text-left text-sm text-gray-700 space-y-1">
                                {[
                                    "Economize tempo de deslocamento",
                                    "Flexibilidade de horários",
                                    "Material digital incluído",
                                ].map((t) => (
                                    <li key={t} className="flex items-start">
                                        <span className="text-green-500 mr-2">✔</span> {t}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* DOMICÍLIO */}
                        <div
                            onClick={() => setChoice("home")}
                            className={`${base} ${choice === "home" ? active : def}`}
                        >
                            <span className={radio(choice === "home")} />
                            <MapPin className="w-10 h-10 text-blue-600 mb-4" />
                            <h2 className="font-semibold mb-2">Domicílio</h2>
                            <p className="text-gray-600 text-sm mb-4">
                                Aulas presenciais em casa com professores qualificados
                                para um aprendizado personalizado.
                            </p>
                            <ul className="text-left text-sm text-gray-700 space-y-1">
                                {[
                                    "Aprendizado presencial",
                                    "Interação direta com professores",
                                    "Material digital incluído",
                                ].map((t) => (
                                    <li key={t} className="flex items-start">
                                        <span className="text-green-500 mr-2">✔</span> {t}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* continue */}
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={() => choice && alert(`Você escolheu: ${choice}`)}
                            disabled={!choice}
                            className="w-72 sm:w-60 bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
