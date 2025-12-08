import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import AgendarAulaButton from "../components/AgendarAulaButton";
import SaibaMaisButton from "../components/SaibaMaisButton";
import imagemHome from "../assets/fotoHome.png";

const Home = () => {
    const navigate = useNavigate();
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            },
            { threshold: 0.2 }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    const handleSaibaMais = () => {
        const isLogged = !!sessionStorage.getItem("token");

        if (!isLogged) {
            navigate("/cadastrar");
            return;
        }
        navigate("/aluno/inicio");
    };

    const handleAgendar = () => {
        const isLogged = !!sessionStorage.getItem("token");

        if (!isLogged) {
            navigate("/cadastrar");
            return;
        }
        navigate("/aluno/agendar-aula");
    };

    return (
        <div
            ref={ref}
            className={`
                w-full bg-[#3970B7] text-white font-quicksand flex flex-col md:flex-row 
                items-center md:items-start relative px-14 sm:px-6 md:px-40 py-12 h-[60vh] 
                md:h-[70vh] overflow-hidden transition-all duration-[1200ms] ease-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
        >
            <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left max-w-xl z-10 w-full h-full">
                <h2 className="font-bold text-2xl sm:text-3xl md:text-[2.5rem]">
                    O seu caminho para o sucesso começa aqui!
                </h2>

                <p className="text-sm sm:text-base md:text-lg mt-4">
                    Na Studi, sabemos que cada aluno tem o seu próprio ritmo de aprendizado e desafios únicos.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
                    <div onClick={handleSaibaMais} className="hover:scale-105 transition-transform duration-300">
                        <SaibaMaisButton />
                    </div>

                    <div onClick={handleAgendar} className="hover:scale-105 transition-transform duration-300">
                        <AgendarAulaButton />
                    </div>
                </div>
            </div>

            <img
                src={imagemHome}
                alt="fotoHome"
                className="hidden md:block absolute right-0 bottom-0 max-w-[39%] h-auto object-contain"
            />
        </div>
    );
};

export default Home;
