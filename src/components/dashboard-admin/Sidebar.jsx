import { useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  CalendarDays,
  CreditCard,
  Settings,
  UserCog,
  LogOut,
} from "lucide-react";
import { SidebarNavItem } from "./SidebarNavItem";
import logo from "../../assets/logo.svg";
import { authService } from "../../services/authService";

export function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      sessionStorage.clear();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      alert("Erro ao realizar logout. Tente novamente.");
    }
  };

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed top-0 left-0 bg-[#3970B7] py-4 px-2 z-50">
      <div className="px-4 pb-6">
        <img src={logo} alt="Logo" className="h-16 w-auto cursor-pointer" onClick={() => navigate('/dashboard')} />
      </div>

      <nav className="flex-1 space-y-2">
        <SidebarNavItem label="Visão Geral" icon={<Home size={18} />} to="/dashboard" />
        <SidebarNavItem label="Professores" icon={<Users size={18} />} to="/dashboard/professores" />
        <SidebarNavItem label="Agendamentos" icon={<CalendarDays size={18} />} to="/dashboard/agendamentos" />
        <SidebarNavItem label="Pagamentos" icon={<CreditCard size={18} />} to="/dashboard/pagamentos" />
        <SidebarNavItem label="Gerenciamento" icon={<UserCog size={18} />} to="/dashboard/gerenciamento" />
        <SidebarNavItem label="Configurações" icon={<Settings size={18} />} to="/dashboard/configuracoes" />
      </nav>

      <div className="px-2 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center w-full text-left px-4 py-3 rounded-md transition-colors text-sm bg-[#3970B7] text-white hover:bg-[#FECB0A]/80 cursor-pointer"
        >
          <LogOut size={18} className="mr-3" />
          Sair da Conta
        </button>
      </div>
    </aside>
  );
}
