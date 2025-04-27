import React from "react";
import ProfessorsCarouselHome from "../components/ProfessorCarouselHome";

/* Same five demo items the old component used.
   Replace with API data later if needed. */
import prof1 from "../assets/professorFabio.png";
import prof2 from "../assets/professoraJuliana.png";

const cards = [
  {
    name: "Fábio",
    location: "São Paulo (disponível online)",
    subject: "Professor(a) de Inglês",
    description:
      "Professor certificado por Cambridge e ex-cast member da Disney",
    image: prof1,
  },
  {
    name: "Mariana Silva",
    location: "São Paulo (disponível online)",
    subject: "Professor(a) de História",
    description: "Mestrado em História",
    image: prof1,
  },
  {
    name: "Juliana Costa",
    location: "São Paulo (disponível online)",
    subject: "Professor(a) de Matemática",
    description: "Doutorado em Matemática",
    image: prof2,
  },
  {
    name: "Fábio",
    location: "São Paulo (disponível online)",
    subject: "Professor(a) de Inglês",
    description:
      "Professor certificado por Cambridge e ex-cast member da Disney",
    image: prof1,
  },
  {
    name: "Mariana Silva",
    location: "São Paulo (disponível online)",
    subject: "Professor(a) de História",
    description: "Mestrado em História",
    image: prof1,
  },
];

export default function ProfessorsSectionHome() {
  return (
    <section
      id="professores"
      className="px-4 mt-12 flex flex-col items-center justify-center min-h-screen"
    >
      {/* headings / description */}
      <div className="text-center mb-8 max-w-2xl">
        <p className="text-yellow-400 font-semibold">
          Encontre seu professor ideal
        </p>
        <h2 className="text-white text-4xl font-bold">
          Conheça Nossos Professores
        </h2>
        <p className="text-white font-light mt-2">
          Profissionais qualificados, apaixonados pelo ensino e prontos para
          ajudar você a alcançar seus objetivos acadêmicos.
        </p>
      </div>

      <ProfessorsCarouselHome cards={cards} />
    </section>
  );
}
