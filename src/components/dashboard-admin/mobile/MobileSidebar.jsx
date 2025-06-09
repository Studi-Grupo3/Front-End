import {
  Home,
  Users,
  CalendarDays,
  CreditCard,
  Settings,
  UserCog,
  LogOut,
  X,
} from "lucide-react";
import { SidebarNavItem as MobileNavItem } from "../SidebarNavItem";
import logoMobile from "../../../assets/logo.svg";
import { authService as mobileAuthService } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

export function MobileSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await mobileAuthService.logout();
      sessionStorage.clear();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      alert("Erro ao realizar logout. Tente novamente.");
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-[#3970B7] z-50 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 md:hidden`}
    >
      <nav className="flex flex-col h-full px-2 pt-4">
        <div className="flex items-center justify-between pr-2 pb-4">
          <MobileNavItem label="Visão Geral" icon={<Home size={18} />} to="/dashboard" />
          <button onClick={onClose} className="cursor-pointer">
            <X className="text-white w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 space-y-2">
          <MobileNavItem label="Professores" icon={<Users size={18} />} to="/dashboard/professores" />
          <MobileNavItem label="Agendamentos" icon={<CalendarDays size={18} />} to="/dashboard/agendamentos" />
          <MobileNavItem label="Pagamentos" icon={<CreditCard size={18} />} to="/dashboard/pagamentos" />
          <MobileNavItem label="Gerenciamento" icon={<UserCog size={18} />} to="/dashboard/gerenciamento" />
          <MobileNavItem label="Configurações" icon={<Settings size={18} />} to="/dashboard/configuracoes" />
        </div>

        <div className="px-2 pb-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-left px-4 py-3 rounded-md transition-colors text-sm bg-[#3970B7] text-white hover:bg-[#FECB0A]/80 cursor-pointer"
          >
            <LogOut size={18} className="mr-3" />
            Sair
          </button>
        </div>
      </nav>
    </div>
  );
}