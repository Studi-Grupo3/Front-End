import { useEffect, useMemo, useRef, useState } from "react";
import { teacherService } from "../services/teacherService";
import { SubjectBadge } from "./dashboard-admin/SubjectBadge";

import botaoAnterior from "../assets/botaoAnterior.png";
import botaoProximo from "../assets/botaoProximo.png";

export default function ProfessorsSectionHome() {
  const [allProfessors, setAllProfessors] = useState([]); // Armazena todos os professores buscados
  const [visibleProfessors, setVisibleProfessors] = useState([]); // Armazena os professores da página atual
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const isMobile = useMemo(() => window.matchMedia("(max-width: 768px)").matches, []);
  // Ajuste do pageSize para mostrar 3 cards no desktop
  const pageSize = isMobile ? 1 : 3;

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        // Busca até 100 professores de uma vez para paginação em memória
        const resp = await teacherService.listPublic(0, 100);
        if (!alive) return;

        const data = Array.isArray(resp) ? resp : resp.content || [];
        setAllProfessors(data);

        // Calcula o total de páginas com base no array completo
        setTotalPages(Math.ceil(data.length / pageSize) || 1);

      } catch (e) {
        console.error("Erro ao carregar professores:", e);
        setAllProfessors([]);
        setTotalPages(1);
      }
    })();
    return () => { alive = false; };
  }, [pageSize]); // Recarrega se mudar o pageSize (mobile/desktop)

  // Atualiza os professores visíveis quando a página ou a lista completa muda
  useEffect(() => {
    const start = page * pageSize;
    const end = start + pageSize;
    setVisibleProfessors(allProfessors.slice(start, end));
  }, [page, allProfessors, pageSize]);

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
              {visibleProfessors.length > 0 ? (
                visibleProfessors.map((prof, idx) => (
                  <div
                    key={prof.id}
                    style={{ transitionDelay: `${idx * 150}ms` }}
                    className={`
                      bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col 
                      overflow-hidden w-[320px] flex-shrink-0
                      transition-all duration-[900ms] ease-out
                      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                    `}
                  >
                    {prof.profileImageUrl ? (
                      <img
                        src={prof.profileImageUrl.replace('/public/', '/')}
                        alt={prof.name}
                        className="w-full h-52 object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : prof.profileImage ? (
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

                      <div className="text-[#3970B7] font-semibold mt-2 flex items-center gap-2">
                        <span className="mr-1">🎓</span>
                        <SubjectBadge subjects={prof.subjects} />
                      </div>

                      <p className="text-gray-600 text-sm mt-2">
                        {prof.resumeTeacher || "Professor ainda não adicionou um resumo."}
                      </p>

                      <div className="mt-auto pt-4">
                        <button
                          onClick={() => window.location.href = "/cadastrar"}
                          className="w-full flex items-center justify-center gap-2 py-2 bg-[#3970B7] text-white font-bold rounded-lg hover:bg-blue-600 transition"
                        >
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
              className={`w-3 h-3 rounded-full mx-1 ${page === idx ? "bg-yellow-400" : "bg-gray-300"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}