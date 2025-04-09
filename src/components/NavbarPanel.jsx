import { Plus } from "lucide-react";
import imagem from "../assets/logo.svg";
import UserAvatar from "./UserAvatar";

const NavbarPanel = () => {
  const nomeUsuario = "João";

  return (
    <nav className="h-[10vh] bg-[#3970B7] text-white flex items-center justify-evenly flex-row">
      <div>
        <img src={imagem} className="h-20 w-auto" />
      </div>

      <div className="flex flex-row justify-evenly w-[40%]">
        <span><h2 className="text-xl font-bold mb-4">Início</h2></span>
        <span><h2 className="text-xl font-bold mb-4">Agendamentos</h2></span>
        <span><h2 className="text-xl font-bold mb-4">Calendário</h2></span>
        <span><h2 className="text-xl font-bold mb-4">Contato</h2></span>
      </div>

      <div className="flex flex-row items-center gap-3">
        {/* Botão com ícone */}
        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 text-sm rounded-lg hover:bg-blue-700 transition">
          <Plus size={18} />
          Agendar Nova Aula
        </button>

        <UserAvatar name="João tarminatti" />

      </div>
    </nav>
  );
};

export default NavbarPanel;
