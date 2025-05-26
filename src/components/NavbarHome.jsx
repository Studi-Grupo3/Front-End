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
        <img src={Imagem} className="h-20" alt="Logo" />
      </div>

      {/* Menu de navegação (somente em telas >= 1024px) */}
      <div className="hidden lg:flex flex-row justify-evenly items-center w-150 h-[12vh]">
        <a
          href="#historia"
          className="font-semibold cursor-pointer hover:text-[#FECB0A]"
          onClick={() => setIsOpen(false)}
        >
          Sobre nós
        </a>
        <a
          href="#serviços"
          className="font-semibold cursor-pointer hover:text-[#FECB0A]"
          onClick={() => setIsOpen(false)}
        >
          Serviços
        </a>
        <a
          href="#planos"
          className="font-semibold cursor-pointer hover:text-[#FECB0A]"
          onClick={() => setIsOpen(false)}
        >
          Planos
        </a>
        <a
          href="#professores"
          className="font-semibold cursor-pointer hover:text-[#FECB0A]"
          onClick={() => setIsOpen(false)}
        >
          Professores
        </a>
        <a
          href="#contato"
          className="font-semibold cursor-pointer hover:text-[#FECB0A]"
          onClick={() => setIsOpen(false)}
        >
          Contato
        </a>
      </div>

      {/* Botões (somente em telas >= 1024px) */}
      <div className="hidden lg:flex gap-4 w-70">
        <button
          onClick={() => navigate("/entrar")}
          className="flex items-center justify-center h-10 w-90 gap-2 rounded-xl border border-[#FFFFFF] bg-[#4088E7] text-white font-semibold cursor-pointer"
        >
          Entrar <ArrowRightIcon className="h-5" />
        </button>
        <button
          onClick={() => navigate("/cadastrar")}
          className="flex items-center justify-center h-10 w-100 gap-2 rounded-xl border border-[#000000] bg-[#FECB0A] text-black font-semibold cursor-pointer"
        >
          Cadastre-se <ArrowRightIcon className="h-5" />
        </button>
      </div>

      {/* Menu Hamburguer (para telas menores) */}
      <div className="absolute right-4 lg:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
        </button>
      </div>

      {/* Menu Dropdown (para telas menores) */}
      {isOpen && (
        <div className="fixed inset-0 top-[12vh] bg-[#3A6FD8] flex flex-col items-center gap-6 pt-10 pb-8 z-40 md:hidden animate-slide-down">
          <a
            href="#historia"
            className="font-semibold cursor-pointer hover:text-[#FECB0A]"
            onClick={() => setIsOpen(false)}
          >
            Sobre nós
          </a>
          <a
            href="#serviços"
            className="font-semibold cursor-pointer hover:text-[#FECB0A]"
            onClick={() => setIsOpen(false)}
          >
            Serviços
          </a>
          <a
            href="#planos"
            className="font-semibold cursor-pointer hover:text-[#FECB0A]"
            onClick={() => setIsOpen(false)}
          >
            Planos
          </a>
          <a
            href="#professores"
            className="font-semibold cursor-pointer hover:text-[#FECB0A]"
            onClick={() => setIsOpen(false)}
          >
            Professores
          </a>
          <a
            href="#contato"
            className="font-semibold cursor-pointer hover:text-[#FECB0A]"
            onClick={() => setIsOpen(false)}
          >
            Contato
          </a>

          <div className="flex flex-col items-center gap-4 w-2/3 mt-6">
            <button
              onClick={() => navigate("/entrar")}
              className="flex items-center justify-center h-10 w-full gap-2 rounded-xl bg-[#4088E7] border border-white text-white font-semibold hover:bg-blue-500 transition"
            >
              Entrar <ArrowRightIcon className="h-5" />
            </button>
            <button
              onClick={() => navigate("/cadastrar")}
              className="flex items-center justify-center h-10 w-full gap-2 rounded-xl bg-[#FECB0A] border border-black text-black font-semibold hover:bg-yellow-400 transition"
            >
              Cadastre-se <ArrowRightIcon className="h-5" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarHome;