// src/components/dashboard-admin/Sidebar.js
import {
    Home,
    BarChart2,
    Users,
    CalendarDays,
    CreditCard,
    FileText,
    Settings
  } from "lucide-react";
  import { SidebarNavItem } from "./SidebarNavItem";
  
  export function Sidebar() {
    return (
      <aside className="w-64 h-screen fixed top-0 left-0 bg-[#3970B7] py-4 px-2 space-y-2 z-50">
        <div className="px-4 pb-6">
          <span className="text-white font-extrabold text-xl tracking-wide">STUDI</span>
        </div>
  
        <SidebarNavItem label="Visão Geral" icon={<Home size={18} />} to="/dashboard" />
        <SidebarNavItem label="Finanças" icon={<BarChart2 size={18} />} to="/dashboard/financas" />
        <SidebarNavItem label="Professores" icon={<Users size={18} />} to="/dashboard/professores" />
        <SidebarNavItem label="Agendamentos" icon={<CalendarDays size={18} />} to="/dashboard/agendamentos" />
        <SidebarNavItem label="Pagamentos" icon={<CreditCard size={18} />} to="/dashboard/pagamentos" />
        <SidebarNavItem label="Relatórios" icon={<FileText size={18} />} to="/dashboard/relatorios" />
        <SidebarNavItem label="Configurações" icon={<Settings size={18} />} to="/dashboard/configuracoes" />
  
      </aside>
    );
  }
  