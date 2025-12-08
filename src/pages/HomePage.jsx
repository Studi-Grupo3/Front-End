// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import NavbarHome from "../components/NavbarHome";
import Home from "../components/Home";
import Historia from "../components/Historia";
import Planos from "../components/Planos";
import Servicos from "../components/Servicos";
import ProfessorsSectionHome from "../components/ProfessorsSectionHome";
import FaleConosco from "../components/FaleConosco";
import Footer from "../components/Footer";

import { smoothScrollTo } from "../utils/smoothScroll";

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);


  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;


    setTimeout(() => {
      const el = document.getElementById(target);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        smoothScrollTo(y, 900);
      }
    }, 120);

    navigate(location.pathname, { replace: true, state: {} });
  }, [location, navigate]);

  if (!ready) return null;

  return (
    <>
      <NavbarHome />

      {/* Seção Home */}
      <div className="bg-[#3A6FD8] text-white font-quicksand">
        <div id="home">
          <Home />
        </div>
      </div>

      {/* Seção História, Serviços, Planos */}
      <div className="bg-[#f8f8f8] text-black font-quicksand">
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

      {/* Seção Professores */}
      <div className="bg-[#3A6FD8] text-white font-quicksand">
        <div id="professores">
          <ProfessorsSectionHome />
        </div>
      </div>

      {/* Seção Contato */}
      <div className="bg-white text-black font-quicksand">
        <div id="contato">
          <FaleConosco />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#3A6FD8] text-white font-quicksand">
        <Footer />
      </div>
    </>
  );
}
