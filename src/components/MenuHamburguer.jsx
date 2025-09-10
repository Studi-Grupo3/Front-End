import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import UserAvatar from "./UserAvatar";
import { useNavigate } from 'react-router-dom';
import { ScheduleButton } from "./appointment-manager/ScheduleButton";

const MenuHamburguer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="md:hidden flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          {isOpen ? (
            <XMarkIcon className="h-8 w-8 text-white" />
          ) : (
            <Bars3Icon className="h-8 w-8 text-white" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-[12vh] right-0 w-full bg-[#3970B7] text-white flex flex-col items-center gap-6 py-6 z-40 md:hidden">
          <div className="flex items-center gap-3">
            <UserAvatar name="João Carminatti" hasNotification={false} />
            <span className="font-semibold">João Carminatti</span>
          </div>

          <h2 className="font-semibold cursor-pointer">Início</h2>
          <h2 className="font-semibold cursor-pointer">Agendamentos</h2>
          <h2 className="font-semibold cursor-pointer">Calendário</h2>
          <h2 className="font-semibold cursor-pointer">Contato</h2>

          <ScheduleButton />
        </div>
      )}
    </>
  );
};

export default MenuHamburguer;