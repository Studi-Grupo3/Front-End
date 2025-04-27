import React from "react";
import { useNavigate } from "react-router-dom";
import ProfessorsCarouselChoose from "../components/ProfessorCarouselChoose";

import prof1 from "../assets/professorFabio.png";
import prof2 from "../assets/professoraJuliana.png";

/* demo list > 4 to prove layout stays intact */
const professors = [
  { id: 1, name: "Fábio",  location: "São Paulo (online)", subject:"Inglês",
    description:"Professor certificado por Cambridge e ex-cast member da Disney", image: prof1 },
  { id: 2, name: "Mariana Silva", location:"São Paulo (online)", subject:"História",
    description:"Mestrado em História", image: prof1 },
  { id: 3, name: "Juliana Costa", location:"São Paulo (online)", subject:"Matemática",
    description:"Doutorado em Matemática", image: prof2 },
  { id: 4, name: "Carlos Oliveira", location:"São Paulo (online)", subject:"Física",
    description:"Mestrado em Física", image: prof1 },
  { id: 5, name: "Ana Pereira", location:"São Paulo (online)", subject:"Química",
    description:"Doutorado em Química", image: prof2 },
];

export default function ChooseProfessor() {
  const nav = useNavigate();

  return (
    <main className="flex min-h-screen bg-gray-50">
      <section className="flex-grow flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-[1280px] bg-white border border-gray-200 rounded-xl p-6 sm:p-10 shadow-sm">

          {/* breadcrumb */}
          <nav className="text-[13px] sm:text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <button onClick={() => nav("/")}           className="hover:underline">Detalhes</button>
            <span className="mx-1">›</span>
            <button onClick={() => nav("/class-model")} className="hover:underline">Modelo de Aula</button>
            <span className="mx-1">›</span>
            <span className="text-blue-600 font-medium">Professor</span>
          </nav>

          <h1 className="text-xl sm:text-2xl font-semibold text-blue-600 text-center mb-4 sm:mb-6">
            Escolha um professor
          </h1>

          {/* skip button */}
          <div className="flex justify-center mb-8">
            <button
              type="button"
              onClick={() => alert("Continuar sem escolher professor")}
              className="px-4 sm:px-6 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50"
            >
              Não quero escolher um professor
            </button>
          </div>

          {/* carousel */}
          <ProfessorsCarouselChoose cards={professors} />

          {/* dot indicator (kept for design) */}
          <div className="flex justify-center mt-6 md:hidden">
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
          </div>
        </div>
      </section>
    </main>
  );
}
