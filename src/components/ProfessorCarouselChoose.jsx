import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";
import { teacherService } from "../services/teacherService";
import botaoAnterior from "../assets/botaoAnterior.png";
import botaoProximo from "../assets/botaoProximo.png";

const subjectMap = {
  PORTUGUESE: "Português",
  MATHEMATICS: "Matemática",
  GEOGRAPHY: "Geografia",
  HISTORY: "História",
  SCIENCE: "Ciências",
  CHEMISTRY: "Química",
  PHYSICS: "Física",
};

const ProfessorCarouselChoose = () => {
  const nav = useNavigate();
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(0);
  const [professors, setProfessors] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const primary = "#3970B7";

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        setLoading(true);
        const response = await teacherService.listPublic(currentPage, 3);
        const data = response.content || response;  
        setProfessors(data);
        setTotalPages(response.totalPages || 1);
      } catch (err) {
        console.error("Erro ao carregar professores:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfessors();
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage + 1 < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (loading) {
    return (
      <main className="h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Carregando professores...</p>
      </main>
    );
  }

  if (professors.length === 0) {
    return (
      <main className="h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Nenhum professor disponível no momento.</p>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gray-50 flex flex-col overflow-hidden">
      <section className="flex-1 flex flex-col items-center justify-start py-6 px-4">
        <div
          className="w-full max-w-[1280px] bg-white border rounded-xl p-4 sm:p-6 shadow-sm transition-all duration-300"
          style={{ borderColor: primary }}
        >
          <h1
            className="text-2xl font-semibold text-center mb-6"
            style={{ color: primary }}
          >
            Escolha um professor
          </h1>

          {/* Botões de navegação */}
          <div className="flex justify-center items-center gap-8 mb-6">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className={`transition-transform hover:scale-105 ${
                currentPage === 0 ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              <img src={botaoAnterior} alt="Anterior" className="w-10 h-10" />
            </button>

            <button
              onClick={handleNext}
              disabled={currentPage + 1 >= totalPages}
              className={`transition-transform hover:scale-105 ${
                currentPage + 1 >= totalPages
                  ? "opacity-40 cursor-not-allowed"
                  : ""
              }`}
            >
              <img src={botaoProximo} alt="Próximo" className="w-10 h-10" />
            </button>
          </div>

          {/* Cards */}
          <div
            className={`flex flex-wrap justify-center gap-6 transition-opacity duration-300 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
          >
            {professors.map((prof) => (
              <div
                key={prof.id}
                className="bg-white border rounded-2xl shadow-lg flex flex-col w-[280px] sm:w-[300px] cursor-pointer hover:shadow-xl transition-transform hover:-translate-y-1"
                style={{ borderColor: "#e5e7eb" }}
              >
                {prof.profileImage ? (
                  <img
                    src={`data:${prof.profileImageContentType};base64,${prof.profileImage}`}
                    alt={prof.name}
                    className="w-full h-40 object-cover rounded-t-2xl"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-t-2xl">
                    <span className="text-gray-500 text-sm">Sem foto</span>
                  </div>
                )}

                <div className="p-4 flex-grow flex flex-col">
                  <h2 className="text-lg font-bold">{prof.name}</h2>
                  <p className="text-gray-500 text-sm flex items-center mt-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    São Paulo (online)
                  </p>
                  <p className="font-semibold mt-2" style={{ color: primary }}>
                    {prof.subjects
                      ?.map((s) => subjectMap[s])
                      .filter(Boolean)
                      .join(", ") || "Matéria não informada"}
                  </p>
                  <p className="text-gray-600 text-sm mt-2 flex-grow">
                    {prof.resumeTeacher ||
                      "Professor ainda não adicionou um resumo."}
                  </p>
                </div>

                <div
                  onClick={() => {
                    localStorage.setItem("selectedProfessorId", prof.id);
                    nav("/aluno/agendar-aula");
                  }}
                  className="p-4 border-t"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <button
                    className="w-full py-2 font-bold rounded-lg transition hover:brightness-110"
                    style={{ backgroundColor: primary, color: "#fff" }}
                  >
                    📅 Agendar aula →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Indicadores de página */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-3 h-3 rounded-full mx-1 ${
                  currentPage === idx ? "bg-yellow-400" : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfessorCarouselChoose;
