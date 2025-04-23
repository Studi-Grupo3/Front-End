import localizacao from "../assets/localização.png";
import telefoneIcon from "../assets/telefone.png";
import email from "../assets/email.png";
import logo2 from "../assets/logo2.png";


const Footer = () => {
    return (
        <footer>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-[17px] text-center">
                
                <div className="flex flex-col items-center mt-6">
                    <div className="flex items-center gap-2 mb-4">
                        <img src={logo2} alt="Logo" className="h-35" />
                    </div>
                </div>

                
                <div className="flex flex-col items-center mt-6">
                    <h4 className="text-lg font-bold mb-2 border-b border-yellow-300 inline-block">Links Rápidos</h4>
                    <ul className="space-y-2 mt-3">
                        <li><a href="#historia" className="hover:text-yellow-300">Sobre Nós</a></li>
                        <li><a href="#planos" className="hover:text-yellow-300">Planos</a></li>
                        <li><a href="#professores" className="hover:text-yellow-300">Professores</a></li>
                        <li><a href="#contato" className="hover:text-yellow-300">Fale Conosco</a></li>
                    </ul>
                </div>

                
                <div className="flex flex-col items-center mt-6">
                    <h4 className="text-lg font-bold mb-2 border-b border-yellow-300 inline-block">Áreas De Ensino</h4>
                    <ul className="space-y-2 mt-3">
                        <li className="hover:text-yellow-300 cursor-pointer">E. Fundamental</li>
                        <li className="hover:text-yellow-300 cursor-pointer">E. Fundamental 2</li>
                        <li className="hover:text-yellow-300 cursor-pointer">E. Médio</li>
                        <li className="hover:text-yellow-300 cursor-pointer">Vestibulares</li>
                    </ul>
                </div>

                
                <div className="flex flex-col items-center mt-6">
                    <h4 className="text-lg font-bold mb-2 border-b border-yellow-300 inline-block">Contato</h4>
                    <ul className="space-y-3 mt-3">
                        <li className="flex items-center justify-center gap-2 hover:text-yellow-300 cursor-pointer">
                            <img src={localizacao} alt="Localização" className="w-5 h-5" />
                            <span>6391 Elgin St. Celina, Delaware 10299</span>
                        </li>
                        <li className="flex items-center justify-center gap-2 hover:text-yellow-300 cursor-pointer">
                            <img src={telefoneIcon} alt="Telefone" className="w-5 h-5" />
                            <span>(303) 555-0105</span>
                        </li>
                        <li className="flex items-center justify-center gap-2 hover:text-yellow-300 cursor-pointer">
                            <img src={email} alt="Email" className="w-5 h-5" />
                            <span>michael.mitc@example.com</span>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};
export default Footer;