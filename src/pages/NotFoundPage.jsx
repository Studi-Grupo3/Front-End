import { useNavigate, useLocation } from "react-router-dom";
import NavbarHome from "../components/NavbarHome";
import NavbarPanel from "../components/NavbarPanel"; 
import Footer from "../components/Footer";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isLoggedInPath = location.pathname.startsWith("/aluno") 
  
  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f8f8]">
      {/* Renderiza a Navbar apropriada com base no contexto */}
      {isLoggedInPath ? <NavbarPanel /> : <NavbarHome />}
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full text-center">
          <h1 className="text-7xl font-bold text-[#3970B7] mb-2">404</h1>
          <div className="h-1 w-24 bg-[#FECB0A] mx-auto mb-6"></div>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Página não encontrada
          </h2>
          
          <p className="text-gray-600 mb-8 mx-auto max-w-md">
            A página que você está procurando pode ter sido removida, 
            renomeada ou talvez nunca tenha existido.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
            onClick={handleGoBack}
            className="inline-flex items-center px-6 py-3 bg-[#3970B7] text-white font-semibold rounded-lg 
                      hover:bg-[#2e5a94] transition-colors shadow-md"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Voltar para a página anterior
          </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFoundPage;