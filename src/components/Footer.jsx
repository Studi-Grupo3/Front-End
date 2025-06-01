import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail 
} from "lucide-react";
import logo2 from "../assets/logo2.png";

const Footer = () => {
  return (
    <footer className="bg-[#3970B7] border-t-2 border-yellow-300 text-white py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Coluna 1: Logo + redes sociais */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 mb-4">
            {/* Aumentei a altura do logo para h-16 */}
            <img src={logo2} alt="Logo" className="h-32 w-auto" />
          </div>
          {/* Ícones de redes sociais via lucide-react */}
          <div className="flex space-x-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Coluna 2: Links Rápidos */}
        <div className="flex flex-col items-start">
          <h4 className="text-lg font-bold mb-2 border-b border-yellow-300 inline-block">
            Links Rápidos
          </h4>
          <ul className="space-y-2 mt-3">
            <li>
              <a href="#historia" className="hover:text-yellow-300">
                Sobre Nós
              </a>
            </li>
            <li>
              <a href="#planos" className="hover:text-yellow-300">
                Planos
              </a>
            </li>
            <li>
              <a href="#professores" className="hover:text-yellow-300">
                Professores
              </a>
            </li>
            <li>
              <a href="#cadastre-se" className="hover:text-yellow-300">
                Cadastre-se
              </a>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Áreas de Ensino */}
        <div className="flex flex-col items-start">
          <h4 className="text-lg font-bold mb-2 border-b border-yellow-300 inline-block">
            Áreas De Ensino
          </h4>
          <ul className="space-y-2 mt-3">
            <li className="hover:text-yellow-300 cursor-pointer">E. Fundamental</li>
            <li className="hover:text-yellow-300 cursor-pointer">E. Fundamental 2</li>
            <li className="hover:text-yellow-300 cursor-pointer">E. Médio</li>
            <li className="hover:text-yellow-300 cursor-pointer">Vestibulares</li>
          </ul>
        </div>

        {/* Coluna 4: Contato */}
        <div className="flex flex-col items-start">
          <h4 className="text-lg font-bold mb-2 border-b border-yellow-300 inline-block">
            Contato
          </h4>
          <ul className="space-y-3 mt-3">
            <li className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
              <MapPin size={20} />
              <span className="text-sm">
                6391 Elgin St. Celina, Delaware 10299
              </span>
            </li>
            <li className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
              <Phone size={20} />
              <span className="text-sm">(303) 555-0105</span>
            </li>
            <li className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
              <Mail size={20} />
              <span className="text-sm">michael.mitc@example.com</span>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
