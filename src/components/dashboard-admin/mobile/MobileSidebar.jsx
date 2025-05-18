// src/components/dashboard-admin/MobileSidebar.js
import {
    Home, BarChart2, Users, CalendarDays, CreditCard, FileText, Settings, X, UserCog
  } from "lucide-react";
  import { SidebarNavItem } from "../SidebarNavItem";
  import logo from "../../../assets/logo.svg";
  
  export function MobileSidebar({ isOpen, onClose }) {
    return (
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-[#3970B7] z-50 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 md:hidden`}
      >
        <nav className="px-2 pt-4 space-y-2">
          {/* Primeira linha com Visão Geral + botão X */}
          <div className="flex items-center justify-between pr-2">
            <SidebarNavItem label="Visão Geral" icon={<Home size={18} />} to="/dashboard" />
            <button onClick={onClose}>
              <X className="text-white w-6 h-6" />
            </button>
          </div>
  
          {/* Restante dos itens */}
          <SidebarNavItem label="Professores" icon={<Users size={18} />} to="/dashboard/professores" />
          <SidebarNavItem label="Agendamentos" icon={<CalendarDays size={18} />} to="/dashboard/agendamentos" />
          <SidebarNavItem label="Pagamentos" icon={<CreditCard size={18} />} to="/dashboard/pagamentos" />
          <SidebarNavItem label="Gerenciamento" icon={<UserCog size={18} />} to="/dashboard/gerenciamento" />
          {/* <SidebarNavItem label="Relatórios" icon={<FileText size={18} />} to="/dashboard/relatorios" /> */}
          <SidebarNavItem label="Configurações" icon={<Settings size={18} />} to="/dashboard/configuracoes" />
        </nav>
      </div>
    );
  }
  
  