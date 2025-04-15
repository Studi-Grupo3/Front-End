import { useState } from "react";
import Imagem from "../assets/logo.svg";
import { Plus } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const NavbarHome = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="h-[12vh] w-full bg-[#3970B7] border-b-4 border-b-[#FECB0A] text-white px-4 md:px-10 flex items-center justify-between md:justify-center flex-row text-sm gap-30">
      <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:w-70 flex md:justify-center">
        <img src={Imagem} className="h-20" />
      </div>

      {/* Menu para telas grandes */}
      <div className="hidden md:flex flex-row w-full max-w-md justify-center gap-15">
        <h2 className="font-semibold cursor-pointer">Início</h2>
        <h2 className="font-semibold cursor-pointer">Agendamentos</h2>
        <h2 className="font-semibold cursor-pointer">Calendário</h2>
        <h2 className="font-semibold cursor-pointer">Contato</h2>
      </div>

      {/* Ícone de hamburguer para telas pequenas */}
      <div className="absolute right-4 md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <XMarkIcon className="h-8 w-8" />
          ) : (
            <Bars3Icon className="h-8 w-8" />
          )}
        </button>
      </div>

      {/* Menu dropdown para telas pequenas com animação */}
      <div
        className={`absolute top-[12vh] left-0 w-full bg-[#3970B7] text-white flex flex-col items-center gap-6 py-6 md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "transform translate-y-0 opacity-100"
            : "transform translate-y-[-100vh] opacity-0"
        }`}
      >
        <div className="flex items-center gap-3">
          <UserAvatar name="João Carminatti" hasNotification={true} />
          <span className="font-semibold">João Carminatti</span>
        </div>

        <h2 className="font-semibold cursor-pointer">Início</h2>
        <h2 className="font-semibold cursor-pointer">Agendamentos</h2>
        <h2 className="font-semibold cursor-pointer">Calendário</h2>
        <h2 className="font-semibold cursor-pointer">Contato</h2>

        {/* Botão "Agendar Nova Aula" agora é um texto clicável com cor #FECB0A */}
        <button className="text-[#FECB0A] text-sm font-semibold hover:text-yellow-400 transition">
          Agendar Nova Aula
        </button>
      </div>

      {/* Botão e ícone de usuário fora do menu para telas grandes */}
      <div className="flex flex-row items-center gap-10 hidden md:flex">
        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 text-sm rounded-lg hover:bg-blue-700 transition border-[0.5px] border-white">
          <Plus size={18} />
          Agendar Nova Aula
        </button>

        <UserAvatar name="João Carminatti" hasNotification={true} />
      </div>
    </nav>
  );
};

export default NavbarHome;
