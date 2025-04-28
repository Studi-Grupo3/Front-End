import { useState } from "react";
import Imagem from "../assets/logo.svg";
import { ArrowRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const NavbarHome = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 h-[12vh] w-full bg-[#3A6FD8] border-b-4 border-b-[#FECB0A] text-white px-4 md:px-10 flex items-center justify-between md:justify-center flex-row text-sm">
            <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:w-70 flex md:justify-center">
                <img src={Imagem} className="h-20" alt="Logo" />
            </div>

            {/* Links Centralizados para Desktop */}
            <div className="hidden md:flex flex-row justify-center items-center w-full space-x-8 pt-4">
                <a href="#historia" className="mb-4 font-semibold cursor-pointer hover:text-[#FECB0A]">Sobre nós</a>
                <a href="#serviços" className="mb-4 font-semibold cursor-pointer hover:text-[#FECB0A]">Serviços</a>
                <a href="#planos" className="mb-4 font-semibold cursor-pointer hover:text-[#FECB0A]">Planos</a>
                <a href="#professores" className="mb-4 font-semibold cursor-pointer hover:text-[#FECB0A]">Professores</a>
                <a href="#contato" className="mb-4 font-semibold cursor-pointer hover:text-[#FECB0A]">Contato</a>
            </div>

            {/* Botões para Desktop */}
            <div className="hidden ml-auto md:flex flex-row gap-4 w-70">
                <button className="flex items-center justify-center h-10 w-24 gap-2 rounded-xl border-1 border-white bg-[#4088E7] text-white font-semibold cursor-pointer">
                    Entrar <ArrowRightIcon className="h-5" />
                </button>
                <button className="flex items-center justify-center h-10 w-32 gap-2 rounded-xl border-1 border-black bg-[#FECB0A] text-black font-semibold cursor-pointer">
                    Cadastre-se <ArrowRightIcon className="h-5" />
                </button>
            </div>

            {/* Ícone do Menu na direita */}
            <div className="flex md:hidden ml-auto">
                <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                    {isOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
                </button>
            </div>
         
            {/* Menu Mobile */}
            {isOpen && (
                <div className="absolute top-[12vh] left-0 w-full bg-[#3A6FD8] flex flex-col items-center gap-6 py-8 z-40 md:hidden">
                    <a href="#historia" className="font-semibold cursor-pointer hover:text-[#FECB0A]" onClick={() => setIsOpen(false)}>Sobre nós</a>
                    <a href="#serviços" className="font-semibold cursor-pointer hover:text-[#FECB0A]" onClick={() => setIsOpen(false)}>Serviços</a>
                    <a href="#planos" className="font-semibold cursor-pointer hover:text-[#FECB0A]" onClick={() => setIsOpen(false)}>Planos</a>
                    <a href="#professores" className="font-semibold cursor-pointer hover:text-[#FECB0A]" onClick={() => setIsOpen(false)}>Professores</a>
                    <a href="#contato" className="font-semibold cursor-pointer hover:text-[#FECB0A]" onClick={() => setIsOpen(false)}>Contato</a>

                    <div className="flex flex-col items-center gap-4 mt-4 w-2/3">
                        <button className="flex items-center justify-center h-10 w-full gap-2 rounded-xl border border-white bg-[#4088E7] text-white font-semibold cursor-pointer">
                            Entrar <ArrowRightIcon className="h-5" />
                        </button>
                        <button className="flex items-center justify-center h-10 w-full gap-2 rounded-xl border border-black bg-[#FECB0A] text-black font-semibold cursor-pointer">
                            Cadastre-se <ArrowRightIcon className="h-5" />
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavbarHome;
