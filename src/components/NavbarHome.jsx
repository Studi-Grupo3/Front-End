import { useState } from "react";
import Imagem from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const NavbarHome = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    return (
        <nav className="h-[12vh] w-full bg-[#3970B7] border-b-4 border-b-[#FECB0A] text-white px-4 lg:px-20 flex items-center justify-between text-sm relative">

            {/* Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:w-70 flex justify-center">
                <img src={Imagem} className="h-20" />
            </div>

            {/* Menu de navegação (somente em telas >= 1024px) */}
            <div className="hidden lg:flex flex-row justify-evenly items-center w-150 h-[12vh]">
                <h2 className="font-semibold cursor-pointer">Sobre nós</h2>
                <h2 className="font-semibold cursor-pointer">Planos</h2>
                <h2 className="font-semibold cursor-pointer">Professores</h2>
                <h2 className="font-semibold cursor-pointer">Contato</h2>
            </div>

            {/* Botões (somente em telas >= 1024px) */}
            <div className="hidden lg:flex gap-4 w-70">
                <button className="flex items-center justify-center h-10 w-90 gap-2 rounded-xl border border-[#FFFFFF] bg-[#4088E7] text-white font-semibold cursor-pointer">
                    Entrar <ArrowRightIcon className="h-5" />
                </button>
                <button className="flex items-center justify-center h-10 w-100 gap-2 rounded-xl border border-[#000000] bg-[#FECB0A] text-black font-semibold cursor-pointer">
                    Cadastre-se <ArrowRightIcon className="h-5" />
                </button>
            </div>

            <div className="absolute right-4 lg:hidden">
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
                </button>
            </div>

            {/* Botões */}
            <div className="hidden ml-auto md:flex flex-row gap-4 w-70">
                <button 
                    onClick={() => navigate("/entrar")}
                className="flex items-center justify-center h-10 w-90 gap-2 rounded-xl border-1 border-[#FFFFFF] bg-[#4088E7] text-white font-semibold cursor-pointer">
                    Entrar <ArrowRightIcon className="h-5" />
                </button>
                <button 
                    onClick={() => navigate("/cadastrar")}
                className="flex items-center justify-center h-10 w-100 gap-2 rounded-xl border-1 border-[#000000] bg-[#FECB0A] text-black font-semibold cursor-pointer">
                    Cadastre-se <ArrowRightIcon className="h-5" />
                </button>
            <div className={`absolute top-[12vh] left-0 w-full bg-[#3970B7] border-b-4 border-b-[#FECB0A] text-white flex flex-col items-center gap-6 py-6 lg:hidden transition-all duration-300 ease-in-out ${isOpen
                ? "transform translate-y-0 opacity-100"
                : "transform translate-y-[-100vh] opacity-0"
                }`}
            >
                <h2 className="font-semibold cursor-pointer">Sobre nós</h2>
                <h2 className="font-semibold cursor-pointer">Planos</h2>
                <h2 className="font-semibold cursor-pointer">Professores</h2>
                <h2 className="font-semibold cursor-pointer">Contato</h2>
            </div>
        </nav>
    );
};

export default NavbarHome;
