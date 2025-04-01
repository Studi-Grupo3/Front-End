import { useState } from "react";
import imagem from "../assets/logo.svg"

const NavbarHome = () => {

    return (

        <nav className=" bg-red-800 text-white p-4 flex flex-row justify-evenly">

            <div>
                <img src={imagem} />
            </div>

            <div className="flex flex-row justify-evenly">

                <div>
                    <h2 className="text-xl font-bold mb-4">Sobre nós</h2>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-4">Planos</h2>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-4">Professores</h2>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-4">Contato</h2>
                </div>

            </div>

            <div className="flex flex-col gap-2">
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
