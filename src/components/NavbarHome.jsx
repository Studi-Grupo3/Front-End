import Imagem from "../assets/logo.svg"
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const NavbarHome = () => {

    return (

        <nav className="h-[12vh] w-screen bg-[#3970B7] border-b-3 border-b-[#FECB0A] text-white flex items-center justify-center flex-row text-[15px]">

            <div className="flex justify-end items-center w-[20%]">
                <img src={Imagem} className="h-20 "/>
            </div>

            <div className="flex flex-row justify-evenly w-[40%]">

                <div>
                    <h2 className="mb-4 font-semibold cursor-pointer">Sobre nós</h2>
                </div>

                <div>
                    <h2 className="mb-4 font-semibold cursor-pointer">Planos</h2>
                </div>

                <div>
                    <h2 className="mb-4 font-semibold cursor-pointer">Professores</h2>
                </div>

                <div>
                    <h2 className="mb-4 font-semibold cursor-pointer">Contato</h2>
                </div>

            </div>

            <div className="flex flex-row gap-4 w-[20%]">
                <button className="flex items-center justify-center h-[50px] w-[400px] gap-2 rounded-xl border-1 border-[#FFFFFF] bg-[#4088E7] text-white font-semibold cursor-pointer">
                    Entrar <ArrowRightIcon className="h-5"/>
                </button>
                <button className="flex items-center justify-center h-[50px] w-[500px] gap-2 rounded-xl border-1 border-[#000000] bg-[#FECB0A] text-black font-semibold cursor-pointer">
                    Cadastre-se <ArrowRightIcon className="h-5"/>
                </button>
            </div>
        </nav>
    );
};

export default NavbarHome;
