// src/components/dashboard-admin/MobileHeader.js
import { Menu } from 'lucide-react';
import logo from '../../../assets/logo.svg';

export function MobileHeader({ onOpen }) {
  return (
    <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-[#3970B7] z-40 border-b-[3px] border-[#FECB0A] flex items-center justify-between px-4 shadow-md">
      <button onClick={onOpen}>
        <Menu className="text-white w-7 h-7" />
      </button>

      {/* Logo centralizada */}
      <img
        src={logo}
        alt="Logo"
        className="h-[70px] w-auto absolute left-1/2 transform -translate-x-1/2"
        style={{ maxWidth: 'none' }}
      />

      {/* Espaço invisível para manter layout alinhado */}
      <div className="w-7 h-7" />
    </div>
  );
}
