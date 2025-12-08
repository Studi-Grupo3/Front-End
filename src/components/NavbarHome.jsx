// src/components/NavbarHome.jsx
import { useState } from "react";
import Imagem from "../assets/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { smoothScrollTo } from "../utils/smoothScroll";

const ids = {
  historia: "historia",
  servicos: "servicos",
  planos: "planos",
  professores: "professores",
  contato: "contato",
};

const NavbarHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (targetId) => {
    setIsOpen(false);

    if (location.pathname === "/") {
      const el = document.getElementById(targetId);
      if (el) {
        const topPosition = el.getBoundingClientRect().top + window.scrollY - 80;
        smoothScrollTo(topPosition);
        return;
      }
    }

    navigate("/", { state: { scrollTo: targetId } });
  };

  return (
    <nav className="h-[12vh] w-full bg-[#3970B7] border-b-4 border-b-[#FECB0A] text-white px-4 lg:px-20 flex items-center justify-between text-sm relative">
      

      <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:w-70 flex justify-center">
        <img
          src={Imagem}
          className="h-20 cursor-pointer hover:scale-105 transition-transform duration-300"
          alt="Logo"
          onClick={() => navigate("/")}
        />
      </div>


      <div className="hidden lg:flex flex-row justify-evenly items-center w-150 h-[10vh]">
        {[
          { label: "Sobre nós", id: ids.historia },
          { label: "Serviços", id: ids.servicos },
          { label: "Planos", id: ids.planos },
          { label: "Professores", id: ids.professores },
          { label: "Contato", id: ids.contato },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => goTo(item.id)}
            className="font-semibold cursor-pointer hover:text-[#FECB0A] text-base transition-all duration-300 hover:-translate-y-1"
          >
            {item.label}
          </button>
        ))}
      </div>


      <div className="hidden lg:flex gap-3 w-70">
        <button
          onClick={() => navigate("/entrar")}
          className="flex items-center justify-center h-10 w-28 gap-1 rounded-lg border border-white bg-[#4088E7] 
          text-sm font-semibold transition-all duration-300 hover:bg-[#3678CC] hover:-translate-y-1"
        >
          Entrar <ArrowRightIcon className="h-4" />
        </button>

        <button
          onClick={() => navigate("/cadastrar")}
          className="flex items-center justify-center h-10 w-32 gap-1 rounded-lg bg-[#FECB0A] text-black text-sm font-semibold 
          transition-all duration-300 hover:bg-[#E6A809] hover:-translate-y-1"
        >
          Cadastre-se <ArrowRightIcon className="h-4" />
        </button>
      </div>


      <div className="absolute right-4 lg:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="transition-transform duration-300 hover:scale-110">
          {isOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 top-[10vh] bg-[#3A6FD8] flex flex-col items-center gap-4 pt-8 pb-6 z-40 animate-slide-down">
          {[
            { label: "Sobre nós", id: ids.historia },
            { label: "Serviços", id: ids.servicos },
            { label: "Planos", id: ids.planos },
            { label: "Professores", id: ids.professores },
            { label: "Contato", id: ids.contato },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className="font-semibold text-base hover:text-[#FECB0A] transition-all duration-300 hover:-translate-y-1"
            >
              {item.label}
            </button>
          ))}

          <div className="flex flex-col items-center gap-3 w-2/3 mt-4">
            <button
              onClick={() => { setIsOpen(false); navigate("/entrar"); }}
              className="h-8 w-full bg-[#4088E7] border border-white text-white text-sm font-semibold rounded-lg 
              transition-all duration-300 hover:bg-[#3678CC] hover:-translate-y-1"
            >
              Entrar
            </button>
            <button
              onClick={() => { setIsOpen(false); navigate("/cadastrar"); }}
              className="h-8 w-full bg-[#FECB0A] border border-black text-black text-sm font-semibold rounded-lg 
              transition-all duration-300 hover:bg-[#E6A809] hover:-translate-y-1"
            >
              Cadastre-se
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarHome;
