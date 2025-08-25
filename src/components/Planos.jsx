// src/components/Planos.jsx
import React from "react";
import imagemFundamental from "../assets/imagemFundamental.png";
import imagemInfantil from "../assets/imagemInfantil.png";
import imagemMedio from "../assets/imagemMedio.png";

const Planos = () => {
  const cards = [
    {
      title: "Ensino Infantil",
      text: "A Studi oferece aulas particulares lúdicas e personalizadas para o Ensino Infantil, estimulando a curiosidade e criatividade das crianças.",
      image: imagemInfantil,
    },
    {
      title: "Ensino Fundamental",
      text: "Neste modelo, as aulas fortalecem a compreensão dos conteúdos e desenvolvem o pensamento crítico e a resolução de problemas.",
      image: imagemFundamental,
    },
    {
      title: "Ensino Médio",
      text: "No Ensino Médio, as aulas particulares preparam para vestibulares e Enem, com revisão de conteúdos e prática de exercícios.",
      image: imagemMedio,
    },
  ];

  return (
    <section id="planos" className="bg-[#f8f8f8] py-16 px-6">
      {/* === Cabeçalho === */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        {/* “Planos” em azul com sublinhado amarelo fino */}
        <p className="inline-block text-[#3970B7] text-lg relative font-semibold mb-2">
          Planos
          <span className="absolute left-0 bottom-[-2px] w-full h-0.5 bg-[#FECB0A]" />
        </p>

        {/* Título grande em azul */}
        <h2 className="text-[#3970B7] text-4xl font-bold mb-2">
          Conheça Nossos Planos
        </h2>

        {/* Subtítulo sem bold, duas linhas para ficar mais “arejado” */}
        <p className="text-gray-700 text-base font-normal leading-relaxed">
          Oferecemos planos adaptados às necessidades de cada nível escolar,
          <br />
          com preços acessíveis e conteúdo de qualidade.
        </p>
      </div>

      {/* === Grid de cards === */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="
              flex
              mx-auto
              flex-col
              bg-[#3970B7]
              rounded-2xl
              border-2 border-gray-300
              shadow-2xl
              overflow-hidden
              hover:scale-105
              transition-transform
              w-[85%]
            "
          >
            {/* === Conteúdo principal do card === */}
            <div className="px-10 pt-5 pb-6 flex-1 flex flex-col justify-center">
              {/* Imagem no topo (altura reduzida para h-36) */}
              <div className="w-2/3 h-36 overflow-hidden rounded-lg mb-4 mx-auto">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Título do plano (centralizado) */}
              <h3 className="text-white text-xl font-semibold text-center mb-4">
                {card.title}
              </h3>

              {/* Descrição (centralizada) */}
              <p className="text-gray-100 text-sm text-center leading-relaxed mb-5 px-2">
                {card.text}
              </p>

              {/* Botão “Saiba Mais” */}
              <a
                href="#"
                className="mt-auto inline-block text-[#FECB0A] font-bold hover:underline text-center"
              >
                Saiba Mais &gt;
              </a>
            </div>

            {/* === Barra amarela fina na base do card === */}
            <div className="h-2 bg-[#FECB0A]" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Planos;
