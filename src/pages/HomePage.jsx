import NavbarHome from "../components/NavbarHome";
import MenuHamburguer from "../components/MenuHamburguer";
import Home from "../components/Home";
import Historia from "../components/Historia";
import Planos from "../components/Planos";
import FaleConosco from "../components/FaleConosco";
import Footer from "../components/Footer";
import Servicos from "../components/Servicos";
import ProfessorsSectionHome from "../components/ProfessorsSectionHome"; 

const HomeSection = () => {
    return (
        <div id="home">
            <Home />
        </div>
    );
};

const HistoriaSection = () => {
    return (
        <div>
            <Historia />
        </div>
    );
};

const PlanosSection = () => {
    return (
        <div id="planos">
            <Planos />
        </div>
    );
};

const ServicosSection = () => {
    return (
        <div id="servicos">
            <Servicos />
        </div>
    );
};

const ProfessorSection = () => {
    return (
            <ProfessorsSectionHome />
        
    );
};

const FaleConoscoSection = () => {
    return (
        <div id="contato">
            <FaleConosco />
        </div>
    );
};

const FooterSection = () => {
    return (
        <div id="footer">
            <Footer />
        </div>
    );
};


export default function HomePage() {
    return (
        <>
            <NavbarHome />
            <MenuHamburguer/>

            <div className="bg-[#3A6FD8] text-white font-quicksand">
                <HomeSection />
            </div>

            <div className="bg-[#ffffff] text-black font-Quicksand">
                <HistoriaSection />
                <ServicosSection />
                <PlanosSection />
            </div>

            <div className="bg-[#3A6FD8] text-white font-quicksand">
                <ProfessorSection />
            </div>

            <div className="bg-[#ffffff] text-black font-quicksand">
                <FaleConoscoSection />
            </div>

            <div className="bg-[#3A6FD8] text-white font-quicksand">
                <FooterSection />
            </div>
        </>
    );
}