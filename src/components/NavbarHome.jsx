import { useState } from "react";
import Imagem from "../assets/logo.svg";
import { ArrowRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const NavbarHome = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 h-[12vh] w-full bg-[#3A6FD8] border-b-4 border-b-[#FECB0A] text-white px-4 md:px-10 flex items-center justify-between md:justify-center flex-row text-sm">
            <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:w-70 flex md:justify-center">
                <img src={Imagem} className="h-20" />
            </div>

            {/* Links Centralizados */}
            <div className="hidden md:flex flex-row justify-center items-center w-full space-x-8">
                <a href="#historia" className="mb-4 font-semibold cursor-pointer hover:text-[#FECB0A]">Sobre nós</a>
                <a href="#s erviços" className="mb-4 font-semibold cursor-pointer hover:text-[#FECB0A]">Serviços</a>
                <a href="#planos" className="mb-4 font-semibold cursor-pointer hover:text-[#FECB0A]">Planos</a>
                <a href="#professores" className="mb-4 font-semibold cursor-pointer hover:text-[#FECB0A]">Professores</a>
                <a href="#contato" className="mb-4 font-semibold cursor-pointer hover:text-[#FECB0A]">Contato</a>
            </div>


            {/* Menu Mobile */}
            <div className={`absolute right-4 md:hidden ${isOpen ? "block" : "hidden"}`}>
                <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                    {isOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
                </button>
            </div>

            {/* Botões */}
            <div className="hidden ml-auto md:flex flex-row gap-4 w-70">
                <button className="flex items-center justify-center h-10 w-90 gap-2 rounded-xl border-1 border-[#FFFFFF] bg-[#4088E7] text-white font-semibold cursor-pointer">
                    Entrar <ArrowRightIcon className="h-5" />
                </button>
                <button className="flex items-center justify-center h-10 w-100 gap-2 rounded-xl border-1 border-[#000000] bg-[#FECB0A] text-black font-semibold cursor-pointer">
                    Cadastre-se <ArrowRightIcon className="h-5" />
                </button>
            </div>
        </nav>
    );
};

export default NavbarHome;
