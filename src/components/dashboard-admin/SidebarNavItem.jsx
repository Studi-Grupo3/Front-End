import { NavLink } from 'react-router-dom';

export function SidebarNavItem({ label, icon, to }) {
  return (
    <NavLink
      to={to}
      end 
      className={({ isActive }) =>
        `flex items-center w-full text-left px-4 py-3 rounded-md transition-colors text-sm ${
          isActive ? 'bg-[#FECB0A] text-black font-medium' : 'bg-[#3970B7] text-white hover:bg-[#FECB0A]/80'
        }`
      }
    >
      <span className="mr-3">{icon}</span>
      {label}
    </NavLink>
  );
}
