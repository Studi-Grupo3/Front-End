import { useState } from "react";
import imagem from "../assets/logo.svg"

const NavbarHome = () => {

    return (

        <nav className="h-[10vh] bg-[#3970B7] text-white flex items-center justify-evenly flex-row text-[60px]">

            <div>
                <img src={imagem} className="h-80"/>
            </div>

            <div className="flex flex-row justify-evenly w-[40%]">

                <span>
                    <h2 className="text-xl font-bold mb-4">Sobre nós</h2>
                </span>

                <span>
                    <h2 className="text-xl font-bold mb-4">Planos</h2>
                </span>

                <span>
                    <h2 className="text-xl font-bold mb-4">Professores</h2>
                </span>

                <span>
                    <h2 className="text-xl font-bold mb-4">Contato</h2>
                </span>

            </div>

            <div className="flex flex-row gap-2">
                <button className="flex items-center justify-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                    Entrar
                </button>
                <button className="flex items-center justify-center gap-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
                    Cadastre-se
                </button>
            </div>
        </nav>
    );
};

export default NavbarHome;
