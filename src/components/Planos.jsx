// src/components/Planos.jsx
import React from "react";
import imagemFundamental from "../assets/imagemFundamental.png";
import imagemInfantil from "../assets/imagemInfantil.png";
import imagemMedio from "../assets/imagemMedio.png";

const Planos = () => {
  const cards = [
    {
      title: "Ensino Infantil",
      text: "A Studi oferece aulas particulares lúdicas e personalizadas...",
      image: imagemInfantil,
    },
    {
      title: "Ensino Fundamental",
      text: "Neste modelo, as aulas fortalecem a compreensão...",
      image: imagemFundamental,
    },
    {
      title: "Ensino Médio",
      text: "No Ensino Médio, as aulas particulares preparam...",
      image: imagemMedio,
    },
  ];

  return (
    <section className="bg-[#f8f8f8] py-16 px-6">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="inline-block text-[#3970B7] text-lg relative font-semibold mb-2">
          Planos
          <span className="absolute left-0 bottom-[-2px] w-full h-0.5 bg-[#FECB0A]" />
        </p>

        <h2 className="text-[#3970B7] text-4xl font-bold mb-2">
          Conheça Nossos Planos
        </h2>

        <p className="text-gray-700 text-base leading-relaxed">
          Oferecemos planos adaptados às necessidades...
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="
              flex mx-auto flex-col bg-[#3970B7] rounded-2xl border-2
              border-gray-300 shadow-2xl overflow-hidden hover:scale-105
              transition-transform w-[85%]
            "
          >
            <div className="px-10 pt-5 pb-6 flex-1 flex flex-col justify-center">
              <div className="w-2/3 h-36 overflow-hidden rounded-lg mb-4 mx-auto">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
              </div>

              <h3 className="text-white text-xl font-semibold text-center mb-4">
                {card.title}
              </h3>

              <p className="text-gray-100 text-sm text-center leading-relaxed mb-5 px-2">
                {card.text}
              </p>

              <a href="#" className="mt-auto inline-block text-[#FECB0A] font-bold hover:underline text-center">
                Saiba Mais &gt;
              </a>
            </div>

            <div className="h-2 bg-[#FECB0A]" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Planos;
