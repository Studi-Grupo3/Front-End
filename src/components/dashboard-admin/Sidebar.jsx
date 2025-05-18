import {
    Home, BarChart2, Users, CalendarDays, CreditCard, FileText, Settings, UserCog
  } from "lucide-react";
  import { SidebarNavItem } from "./SidebarNavItem";
  import logo from "../../assets/logo.svg";
  
  export function Sidebar() {
    return (
      <aside className="hidden md:block w-64 h-screen fixed top-0 left-0 bg-[#3970B7] py-4 px-2 space-y-2 z-50">
        <div className="px-4 pb-6">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
        </div>
  
        <SidebarNavItem label="Visão Geral" icon={<Home size={18} />} to="/dashboard" />
        <SidebarNavItem label="Professores" icon={<Users size={18} />} to="/dashboard/professores" />
        <SidebarNavItem label="Agendamentos" icon={<CalendarDays size={18} />} to="/dashboard/agendamentos" />
        <SidebarNavItem label="Pagamentos" icon={<CreditCard size={18} />} to="/dashboard/pagamentos" />
        <SidebarNavItem label="Gerenciamento" icon={<UserCog size={18} />} to="/dashboard/gerenciamento" />
        {/* <SidebarNavItem label="Relatórios" icon={<FileText size={18} />} to="/dashboard/relatorios" /> */}
        <SidebarNavItem label="Configurações" icon={<Settings size={18} />} to="/dashboard/configuracoes" />
      </aside>
    );
  }
  