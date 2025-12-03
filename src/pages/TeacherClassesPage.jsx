import React, { useEffect, useState } from "react";
import NavbarPanel from "../components/NavbarTeacher";
import InfoCard from "../components/InfoCard";
import { DollarSign, Users, Clock } from "lucide-react";
import { teacherService } from "../services/teacherService";
import { translateSubject, translateWeekday, translateMonth } from "../utils/tradutionUtils";
import { TeacherAppointmentCard } from "../components/appointment-manager/TeacherAppointmentCard";
import { AppointmentModal } from "../components/appointment-manager/AppointmentModal";

export default function TeacherClassesPage() {
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  const [lessons, setLessons] = useState([]);
  const [loadingLessons, setLoadingLessons] = useState(true);
  const [errorLessons, setErrorLessons] = useState(null);

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchLessons = () => {
    setLoadingLessons(true);
    teacherService.getProximasAulas()
      .then(data => {
        setLessons(data);
        setErrorLessons(null);
      })
      .catch(() => {
        setErrorLessons("Não foi possível carregar as próximas aulas.");
      })
      .finally(() => setLoadingLessons(false));
  };

  useEffect(() => {
    // estatísticas
    teacherService.getStats()
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoadingStats(false));

    fetchLessons();
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

          {!loadingLessons && !errorLessons && lessons.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              Nenhuma aula agendada encontrada.
            </div>
          )}

          {!loadingLessons && !errorLessons && lessons.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map(l => {
                // data e hora separados no DTO
                const [year, month, day] = l.date.split("-");
                // l.time might be "HH:MM:SS" or "HH:MM"
                const [hour, minute] = l.time.split(":");
                const dt = new Date(l.date + "T" + l.time);

                const displayDate = dt.toLocaleDateString("pt-BR", {
                  weekday: "long", day: "numeric", month: "long"
                });
                const displayTime = `${hour}:${minute}`;

                return (
                  <TeacherAppointmentCard
                    key={l.id}
                    subject={translateSubject(l.disciplina)}
                    studentName={l.studentName}
                    studentPhone={l.studentPhone}
                    studentImageUrl={null}
                    date={displayDate}
                    time={displayTime}
                    duration={`${l.lessonDuration}min`}
                    location={l.location}
                    status={l.status}
                    online={l.location === "Online"}
                    onDetailsClick={() => {
                      const adaptedLesson = {
                        ...l,
                        professorName: l.studentName,
                        professorTitle: "Aluno",
                        subject: l.disciplina,
                        dateTime: `${l.date}T${l.time}`,
                        duration: l.lessonDuration,
                      };
                      setSelectedLesson(adaptedLesson);
                      setOpenModal(true);
                    }}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>

      <AppointmentModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        appointment={selectedLesson}
        onUpdate={fetchLessons}
        isTeacherView={true}
      />
    </div>
  );
}
