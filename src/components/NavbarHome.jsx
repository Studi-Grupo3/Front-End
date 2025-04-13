import { useState } from "react";
import Imagem from "../assets/logo.svg"
import { ArrowRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const NavbarHome = () => {
    const [isOpen, setIsOpen] = useState(false);


    return (

        <nav className=" h-[12vh] w-full bg-[#3970B7] border-b-4 border-b-[#FECB0A] text-white px-4 md:px-10 flex items-center justify-between md:justify-center flex-row text-sm">

            <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:w-70 flex md:justify-center">
                <img src={Imagem} className="h-20 "/>
            </div>

            <div className="hidden md:flex flex-row justify-evenly w-150">

                    <h2 className="mb-4 font-semibold cursor-pointer">Sobre nós</h2>

                    <h2 className="mb-4 font-semibold cursor-pointer">Planos</h2>

                    <h2 className="mb-4 font-semibold cursor-pointer">Professores</h2>

                    <h2 className="mb-4 font-semibold cursor-pointer">Contato</h2>

            </div>

            <div className="hidden ml-auto md:flex flex-row gap-4 w-70">
                <button className="flex items-center justify-center h-10 w-90 gap-2 rounded-xl border-1 border-[#FFFFFF] bg-[#4088E7] text-white font-semibold cursor-pointer">
                    Entrar <ArrowRightIcon className="h-5"/>
                </button>
                <button className="flex items-center justify-center h-10 w-100 gap-2 rounded-xl border-1 border-[#000000] bg-[#FECB0A] text-black font-semibold cursor-pointer">
                    Cadastre-se <ArrowRightIcon className="h-5"/>
                </button>
            </div>

            <div className="absolute right-4 md:hidden">
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
                </button>
            </div>
        </nav>
    );
};

export default NavbarHome;
