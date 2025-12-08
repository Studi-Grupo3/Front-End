import { useEffect, useMemo, useRef, useState } from "react";
import { teacherService } from "../services/teacherService";

import botaoAnterior from "../assets/botaoAnterior.png";
import botaoProximo from "../assets/botaoProximo.png";

const subjectTranslations = {
  PORTUGUESE: "Português",
  MATHEMATICS: "Matemática",
  GEOGRAPHY: "Geografia",
  HISTORY: "História",
  SCIENCE: "Ciências",
  CHEMISTRY: "Química",
  PHYSICS: "Física",
};

export default function ProfessorsSectionHome() {
  const [professors, setProfessors] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const isMobile = useMemo(() => window.matchMedia("(max-width: 768px)").matches, []);
  const pageSize = isMobile ? 1 : 3;

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const resp = await teacherService.listPublic(page, pageSize);
        if (!alive) return;
        const data = Array.isArray(resp) ? resp : resp.content || [];
        setProfessors(data);
        setTotalPages(resp.totalPages ?? 1);
      } catch (e) {
        console.error("Erro ao carregar professores:", e);
        setProfessors([]);
        setTotalPages(1);
      }
    })();
    return () => { alive = false; };
  }, [page, pageSize]);

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

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const prev = () => setPage((p) => (p > 0 ? p - 1 : 0));
  const next = () => setPage((p) => (p + 1 < totalPages ? p + 1 : p));

  return (
    <div
      ref={sectionRef}
      className={`
        bg-[#3970B7] px-4 pt-12 pb-12 flex flex-col items-center
        transition-all duration-[1000ms] ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      <div className="text-center mb-8 max-w-2xl">
        <p className="text-yellow-400 font-semibold">
          Encontre seu professor ideal
        </p>
        <h2 className="text-white text-4xl font-bold">
          Conheça Nossos Professores
        </h2>
        <p className="text-gray-200 font-extralight mt-2">
          Profissionais qualificados, apaixonados pelo ensino e prontos para ajudar você.
        </p>
      </div>

      <div className="flex flex-col items-center w-full max-w-7xl">
        <div className="flex justify-between items-center w-full px-4">
          
          {/* Botão Anterior */}
          <button type="button" onClick={prev} className="mx-2 md:mx-4">
            <img src={botaoAnterior} alt="Anterior" />
          </button>

          {/* Cards */}
          <div className="overflow-hidden w-full">
            <div className="w-full flex justify-center gap-6">
              {professors.length > 0 ? (
                professors.map((prof, idx) => (
                  <div
                    key={prof.id}
                    style={{ transitionDelay: `${idx * 150}ms` }}
                    className={`
                      bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col 
                      overflow-hidden max-w-[420px] w-full
                      transition-all duration-[900ms] ease-out
                      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                    `}
                  >
                    {prof.profileImage ? (
                      <img
                        src={`data:${prof.profileImageContentType};base64,${prof.profileImage}`}
                        alt={prof.name}
                        className="w-full h-52 object-cover"
                      />
                    ) : (
                      <div className="w-full h-52 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">Sem foto</span>
                      </div>
                    )}

                    <div className="p-4 flex flex-col flex-grow">
                      <h2 className="text-lg font-bold text-gray-800">
                        {prof.name}
                      </h2>
                      <p className="text-gray-500 text-sm flex items-center mt-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        São Paulo (online)
                      </p>
                      <p className="text-[#3970B7] font-semibold mt-2 flex items-center">
                        <span className="mr-2">🎓</span>
                        Professor(a) de{" "}
                        {prof.subjects?.length
                          ? subjectTranslations[prof.subjects[0]] ||
                            "Matéria não informada"
                          : "Matéria não informada"}
                      </p>

                      <p className="text-gray-600 text-sm mt-2">
                        {prof.resumeTeacher || "Professor ainda não adicionou um resumo."}
                      </p>

                      <div className="mt-auto pt-4">
                        <button className="w-full flex items-center justify-center gap-2 py-2 bg-[#3970B7] text-white font-bold rounded-lg hover:bg-blue-600 transition">
                          📅 Agendar aula →
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-white text-center p-6">
                  Nenhum professor disponível no momento.
                </p>
              )}
            </div>
          </div>

          {/* Botão Próximo */}
          <button type="button" onClick={next} className="mx-2 md:mx-4">
            <img src={botaoProximo} alt="Próximo" />
          </button>
        </div>

        {/* Paginação */}
        <div className="flex mt-6">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx)}
              className={`w-3 h-3 rounded-full mx-1 ${
                page === idx ? "bg-yellow-400" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
