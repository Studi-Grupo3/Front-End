// src/components/Footer.jsx
import {
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import logo2 from "../assets/logo2.png";
import { useNavigate, useLocation } from "react-router-dom";
import { smoothScrollTo } from "../utils/smoothScroll";
import { useEffect, useRef, useState } from "react";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        const pos = el.getBoundingClientRect().top + window.scrollY - 80;
        smoothScrollTo(pos, 900);
        return;
      }
    }

    navigate("/", { state: { scrollTo: id } });
  };

  return (
    <footer
      ref={ref}
      className={`
        bg-[#3970B7] border-t-2 border-yellow-300 text-white py-8 px-4 md:px-0
        transition-all duration-[1200ms] ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-y-8 md:grid-cols-4 md:gap-x-8">

        {/* Coluna 1: Logo */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="w-full flex justify-end md:justify-start mb-4 px-7">
            <img src={logo2} alt="Logo" className="h-32 w-auto" />
          </div>
        </div>

        {/* Coluna 2: Links Rápidos */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h4 className="text-lg font-bold mb-2 border-b border-yellow-300 inline-block">
            Links Rápidos
          </h4>
          <ul className="space-y-2 mt-3">
            <li>
              <button
                onClick={() => scrollToSection("historia")}
                className="hover:text-yellow-300 cursor-pointer"
              >
                Sobre Nós
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("planos")}
                className="hover:text-yellow-300 cursor-pointer"
              >
                Planos
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("professores")}
                className="hover:text-yellow-300 cursor-pointer"
              >
                Professores
              </button>
            </li>
            <li
              className="hover:text-yellow-300 cursor-pointer"
              onClick={() => navigate("/cadastrar")}
            >
              Cadastre-se
            </li>
          </ul>
        </div>

        {/* Coluna 3: Áreas */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
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
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h4 className="text-lg font-bold mb-2 border-b border-yellow-300 inline-block">
            Contato
          </h4>
          <ul className="space-y-3 mt-3">

            <li className="flex flex-col items-center sm:flex-row sm:items-center gap-1 sm:gap-2">
              <a
                href="https://wa.me/5511983458739"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer"
              >
                <Phone size={20} />
                <span className="text-sm">(11) 98345-8739</span>
              </a>
            </li>

            <li className="flex flex-col items-center sm:flex-row sm:items-center gap-1 sm:gap-2 hover:text-yellow-300 cursor-pointer">
              <Mail size={20} />
              <span className="text-sm">mamasantolin@gmail.com</span>
            </li>

          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
