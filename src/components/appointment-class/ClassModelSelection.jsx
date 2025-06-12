import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Laptop, MapPin } from "lucide-react";
import NavbarPanel from "../NavbarPanel";

export default function ClassModelSelection() {
  const navigate = useNavigate();
  const [choice, setChoice] = useState(
    () => localStorage.getItem("classModel") || null
  );

  /* quick helpers for styling */
  // Option cards ocupam espaço igualmente (flex-1) e têm padding interno
  const base =
    "w-full sm:flex-1 border rounded-lg px-8 py-10 transition-colors cursor-pointer flex flex-col items-center text-center";
  const def = "border-gray-300 hover:border-[#3970B7]";
  const active =
    "border-[#3970B7] shadow-[0_0_0_2px_rgba(57,112,183,0.25)]";
  const radio = (sel) =>
    `flex items-center justify-center w-5 h-5 rounded-full border-2 mb-3 ${
      sel
        ? "border-[#3970B7] bg-[#3970B7]"
        : "border-[#3970B7] bg-transparent"
    }`;

  return (
    <main className="flex flex-col min-h-screen bg-[#f8f8f8]">
      {/* Navbar fixa no topo; ajuste h-16 se necessário */}
      <header className="fixed top-0 left-0 w-full h-16 z-50 bg-white shadow">
        <NavbarPanel />
      </header>

      {/* Conteúdo abaixo do Navbar */}
      <section className="flex-1 flex items-center justify-center pt-24 pb-12">
        {/* Card branco com largura ainda maior */}
        <div className="w-full sm:px-4 max-w-4xl bg-white border border-gray-200 rounded-xl p-10 shadow-sm">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
            <button
              onClick={() => navigate("/aluno/formulario")}
              className="hover:underline cursor-pointer"
            >
              Detalhes
            </button>
            <span className="mx-1">›</span>
            <span className="text-[#3970B7] font-medium">Modelo de Aula</span>
          </nav>

          {/* Título menor */}
          <h1 className="text-xl sm:text-2xl font-semibold text-[#3970B7] text-center mb-6">
            Selecione o modelo de aula
          </h1>

          {/* Option cards: flex-1 para ocupar espaço */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-8">
            {/* ONLINE */}
            <div
              onClick={() => {
                setChoice("online");
                localStorage.setItem("classModel", "online");
              }}
              className={`${base} ${choice === "online" ? active : def}`}
            >
              <span className={radio(choice === "online")} />
              <Laptop className="w-8 h-8 text-[#3970B7] mb-3" />
              <h2 className="font-semibold mb-2">Online</h2>
              <p className="text-gray-600 text-sm mb-4">
                Aulas ao vivo pela internet com nossos professores qualificados.
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
              onClick={() => {
                setChoice("home");
                localStorage.setItem("classModel", "home");
              }}
              className={`${base} ${choice === "home" ? active : def}`}
            >
              <span className={radio(choice === "home")} />
              <MapPin className="w-8 h-8 text-[#3970B7] mb-3" />
              <h2 className="font-semibold mb-2">Domicílio</h2>
              <p className="text-gray-600 text-sm mb-4">
                Aulas presenciais em casa com professores qualificados.
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

          {/* Botão Continuar */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/aluno/escolher-professor")}
              disabled={!choice}
              className={`
                w-64 sm:w-56 
                bg-[#3970B7] 
                text-white 
                font-medium 
                py-3 
                rounded 
                disabled:opacity-50 
                ${
                  !choice
                    ? "cursor-not-allowed"
                    : "hover:bg-[#2e5a94] cursor-pointer"
                }
              `}
            >
              Continuar
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
