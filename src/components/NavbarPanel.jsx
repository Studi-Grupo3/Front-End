import { useState } from "react";
import Imagem from "../assets/logo.svg";
import { Plus } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const NavbarHome = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" h-[12vh] w-full bg-[#3970B7] border-b-4 border-b-[#FECB0A] text-white px-4 md:px-10 flex items-center justify-between md:justify-center flex-row text-sm">
      <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:w-70 flex md:justify-center">
        <img src={Imagem} className="h-20 " />
      </div>

      <div className="hidden md:flex flex-row justify-evenly w-150">
        <h2 className="mb-4 font-semibold cursor-pointer">Início</h2>

        <h2 className="mb-4 font-semibold cursor-pointer">Agendamentos</h2>

        <h2 className="mb-4 font-semibold cursor-pointer">Calendário</h2>

        <h2 className="mb-4 font-semibold cursor-pointer">Contato</h2>
      </div>

      <div className="flex flex-row items-center gap-10">
        {/* Botão com ícone */}
        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 text-sm rounded-lg hover:bg-blue-700 transition border-[0.5px] border-white">
          <Plus size={18} />
          Agendar Nova Aula
        </button>

        <UserAvatar name="João tarminatti" />
      </div>

      <div className="absolute right-4 md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <XMarkIcon className="h-8 w-8" />
          ) : (
            <Bars3Icon className="h-8 w-8" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default NavbarHome;
