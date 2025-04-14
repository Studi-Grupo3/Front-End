
import imagem from "../assets/logo.svg";

const NavbarHome = () => {
    return (
        <nav className="h-[10vh] bg-[#3A6FD8] text-white flex items-center justify-between px-6 md:px-12 text-lg sm:text-xl font-quicksand">
            <div>
                <img src={imagem} className="h-30" alt="Logo" />
            </div>

            <div className="hidden md:flex flex-row gap-8 text-sm lg:text-base">
                <span className="cursor-pointer hover:underline">Sobre Nós</span>
                <span className="cursor-pointer hover:underline">Planos</span>
                <span className="cursor-pointer hover:underline">Professores</span>
                <span className="cursor-pointer hover:underline">Contato</span>
            </div>

            <div className="flex flex-row gap-4">
                <button className="px-6 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-[#3A6FD8] transition text-sm md:text-base">
                    Entrar →
                </button>
                <button className="px-6 py-2 bg-[#FECB0A] text-black rounded-lg hover:bg-[#E6A809] transition text-sm md:text-base">
                    Cadastre-se →
                </button>
            </div>
        </nav>
    );
};

export default NavbarHome;


