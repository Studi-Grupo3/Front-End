// src/components/NavbarHome.jsx
import { useState } from "react";
import Imagem from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const NavbarHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="h-[12vh] w-full bg-[#3970B7] border-b-4 border-b-[#FECB0A] text-white px-4 lg:px-20 flex items-center justify-between text-sm relative">
      {/* Logo */}
      <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:w-70 flex justify-center">
        <img
          src={Imagem}
          className="h-20 cursor-pointer" // <--- Altura da logo ligeiramente menor
          alt="Logo"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Menu de navegação (desktop) */}
      <div className="hidden lg:flex flex-row justify-evenly items-center w-150 h-[10vh]">
        <a
          href="#historia"
          className="font-semibold cursor-pointer hover:text-[#FECB0A] text-base" // <--- text-base em vez de text-lg
          onClick={() => setIsOpen(false)}
        >
          Sobre nós
        </a>
        <a
          href="#serviços"
          className="font-semibold cursor-pointer hover:text-[#FECB0A] text-base"
          onClick={() => setIsOpen(false)}
        >
          Serviços
        </a>
        <a
          href="#planos"
          className="font-semibold cursor-pointer hover:text-[#FECB0A] text-base"
          onClick={() => setIsOpen(false)}
        >
          Planos
        </a>
        <a
          href="#professores"
          className="font-semibold cursor-pointer hover:text-[#FECB0A] text-base"
          onClick={() => setIsOpen(false)}
        >
          Professores
        </a>
        <a
          href="#contato"
          className="font-semibold cursor-pointer hover:text-[#FECB0A] text-base"
          onClick={() => setIsOpen(false)}
        >
          Contato
        </a>
      </div>

      {/* Botões (desktop) */}
      <div className="hidden lg:flex gap-3 w-70">
        {/* Botão “Entrar” menor */}
        <button
          onClick={() => navigate("/entrar")}
          className="flex items-center justify-center h-10 w-28 gap-1 rounded-lg border border-[#FFFFFF] bg-[#4088E7] text-white text-sm font-semibold cursor-pointer hover:bg-[#3678CC] transition-colors"
        >
          Entrar <ArrowRightIcon className="h-4" /> 
        </button>
        {/* Botão “Cadastre-se” menor */}
        <button
          onClick={() => navigate("/cadastrar")}
          className="flex items-center justify-center h-10 w-32 gap-1 rounded-lg border border-[#000000] bg-[#FECB0A] text-black text-sm font-semibold cursor-pointer hover:bg-[#E6A809] transition-colors"
        >
          Cadastre-se <ArrowRightIcon className="h-4" />
        </button>
      </div>

      {/* Botão hamburguer (mobile) */}
      <div className="absolute right-4 lg:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <XMarkIcon className="h-7 w-7" />  // Ícone um pouco menor
          ) : (
            <Bars3Icon className="h-7 w-7" />
          )}
        </button>
      </div>

      {/* Menu Dropdown (mobile) */}
      {isOpen && (
        <div className="fixed inset-0 top-[10vh] bg-[#3A6FD8] flex flex-col items-center gap-4 pt-8 pb-6 z-40 md:hidden animate-slide-down">
          <a
            href="#historia"
            className="font-semibold cursor-pointer hover:text-[#FECB0A] text-base"
            onClick={() => setIsOpen(false)}
          >
            Sobre nós
          </a>
          <a
            href="#serviços"
            className="font-semibold cursor-pointer hover:text-[#FECB0A] text-base"
            onClick={() => setIsOpen(false)}
          >
            Serviços
          </a>
          <a
            href="#planos"
            className="font-semibold cursor-pointer hover:text-[#FECB0A] text-base"
            onClick={() => setIsOpen(false)}
          >
            Planos
          </a>
          <a
            href="#professores"
            className="font-semibold cursor-pointer hover:text-[#FECB0A] text-base"
            onClick={() => setIsOpen(false)}
          >
            Professores
          </a>
          <a
            href="#contato"
            className="font-semibold cursor-pointer hover:text-[#FECB0A] text-base"
            onClick={() => setIsOpen(false)}
          >
            Contato
          </a>

          <div className="flex flex-col items-center gap-3 w-2/3 mt-4">
            <button
              onClick={() => navigate("/entrar")}
              className="flex items-center justify-center h-8 w-full gap-1 rounded-lg bg-[#4088E7] border border-white text-white text-sm font-semibold hover:bg-[#3678CC] transition-colors"
            >
              Entrar <ArrowRightIcon className="h-4" />
            </button>
            <button
              onClick={() => navigate("/cadastrar")}
              className="flex items-center justify-center h-8 w-full gap-1 rounded-lg bg-[#FECB0A] border border-black text-black text-sm font-semibold hover:bg-[#E6A809] transition-colors"
            >
              Cadastre-se <ArrowRightIcon className="h-4" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarHome;
