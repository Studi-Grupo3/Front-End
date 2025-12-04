// src/pages/HomePage.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import NavbarHome from "../components/NavbarHome";
import Home from "../components/Home";
import Historia from "../components/Historia";
import Planos from "../components/Planos";
import Servicos from "../components/Servicos";
import ProfessorsSectionHome from "../components/ProfessorsSectionHome";
import FaleConosco from "../components/FaleConosco";
import Footer from "../components/Footer";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;

    setTimeout(() => {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);
  }, [location]);

  return (
    <>
      <NavbarHome />

      <div className="bg-[#3A6FD8] text-white font-quicksand">
        <div id="home">
          <Home />
        </div>
      </div>

      <div className="bg-white text-black font-quicksand">
        <div id="historia">
          <Historia />
        </div>

        <div id="servicos">
          <Servicos />
        </div>

        <div id="planos">
          <Planos />
        </div>
      </div>

      <div className="bg-[#3A6FD8] text-white font-quicksand">
        <div id="professores">
          <ProfessorsSectionHome />
        </div>
      </div>

      <div className="bg-white text-black font-quicksand">
        <div id="contato">
          <FaleConosco />
        </div>
      </div>

      <div className="bg-[#3A6FD8] text-white font-quicksand">
        <Footer />
      </div>
    </>
  );
}