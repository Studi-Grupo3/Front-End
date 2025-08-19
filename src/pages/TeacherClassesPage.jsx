import React, { useEffect, useState } from "react";
import NavbarPanel from "../components/NavbarTeacher";
import InfoCard from "../components/InfoCard";
import { DollarSign, Users, Clock, Download } from "lucide-react";
import { teacherService } from "../services/teacherService";
import { translateSubject, translateWeekday, translateMonth } from "../utils/tradutionUtils";

export default function TeacherClassesPage() {
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  const [lessons, setLessons] = useState([]);
  const [loadingLessons, setLoadingLessons] = useState(true);
  const [errorLessons, setErrorLessons] = useState(null);

  useEffect(() => {
    // estatísticas
    teacherService.getStats()
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoadingStats(false));

    // próximas aulas via endpoint
    teacherService.getProximasAulas()
      .then(data => {
        setLessons(data);
        setErrorLessons(null);
      })
      .catch(() => {
        setErrorLessons("Não foi possível carregar as próximas aulas.");
      })
      .finally(() => setLoadingLessons(false));
  }, []);

  return (
    <div className="bg-[#f9fbfc] min-h-screen">
      <div className="w-full sticky top-0 z-50">
        <NavbarPanel role="teacher" />
      </div>
      <div className="px-6 py-8 max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
          Bem-vindo, Professor!
        </h2>

        {/* Cards informativos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <InfoCard
            title="Aulas Hoje"
            value={loadingStats ? "..." : stats?.aulasHoje ?? 0}
            icon={<DollarSign className="w-5 h-5 text-gray-400" />}
            subtitle={loadingStats ? "" : stats?.aulasHojeSubtitle}
          />
          <InfoCard
            title="Aulas Esta Semana"
            value={loadingStats ? "..." : stats?.aulasSemana ?? 0}
            icon={<Users className="w-5 h-5 text-gray-400" />}
            subtitle={loadingStats ? "" : stats?.aulasSemanaSubtitle}
          />
          <InfoCard
            title="Horas Ministradas"
            value={loadingStats ? "..." : stats?.horasMinistradas ?? "0h"}
            icon={<Clock className="w-5 h-5 text-gray-400" />}
            subtitle={loadingStats ? "" : stats?.horasMinistradasSubtitle}
          />
        </div>

        {/* Próximas Aulas */}
        <section>
          <h3 className="text-2xl font-bold mb-6">Próximas Aulas</h3>

          {loadingLessons && <p>Carregando aulas...</p>}
          {errorLessons && <p className="text-red-600">{errorLessons}</p>}

          {!loadingLessons && !errorLessons && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lessons.map(l => {
                // data e hora separados no DTO
                const [year, month, day] = l.date.split("-");
                const [hour, minute] = l.time.split(":");
                const dt = new Date(l.date + "T" + l.time);
                const weekday = translateWeekday(dt.toLocaleDateString("en-US", { weekday: "long" }));
                const monthPt = translateMonth(dt.toLocaleDateString("en-US", { month: "long" }));
                const displayDate = `${weekday}, ${day} de ${monthPt}`;
                const displayTime = `${hour}:${minute}`;

                return (
                  <div
                    key={l.id}
                    className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition border-t-4 border-[#FECB0A]"
                  >
                    <h4 className="text-xl font-semibold text-[#3970B7] mb-2">
                      {translateSubject(l.disciplina)}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">
                      Aluno: {l.studentName}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      {displayDate} às {displayTime}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      Duração: <span className="font-medium text-[#3970B7]">{l.lessonDuration} min</span>
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      Local: <span className="font-medium text-[#3970B7]">{l.location}</span>
                    </p>
                    <a
                      href={l.materialUrl || "#"}
                      download
                      className="inline-flex items-center px-4 py-2 bg-[#3970B7] text-white rounded-lg hover:bg-opacity-90 transition"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Material
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
