import React, { useState, useEffect, useCallback } from "react";
import { appointmentService } from "../../services/appointmentService";
import { AppointmentCard }    from "./AppointmentCard";
import { AppointmentModal }   from "./AppointmentModal";
import { SkeletonAppointmentCard } from "../../components/common/SkeletonAppointmentCard";
import {
  translateSubject,
  translateProfessorTitle
} from "../../utils/tradutionUtils";

export const AllAppointments = ({ filter = "ALL" }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);
  const [selected,     setSelected]     = useState(null);
  const [openModal,    setOpenModal]    = useState(false);

  const fetchAppointments = useCallback(() => {
    setLoading(true);
    appointmentService
      .list()
      .then(data => {
        setAppointments(data);
        setError(null);
      })
      .catch(() => setError("Não foi possível carregar os agendamentos."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // 1) skeleton enquanto carrega
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {Array(6).fill().map((_, i) => (
          <SkeletonAppointmentCard key={i} />
        ))}
      </div>
    );
  }

  // 2) mensagem de erro padronizada
  if (error) {
    return (
      <div className="p-6 text-red-600 text-center">
        {error}
      </div>
    );
  }

  // 3) prepare display
  const items = appointments.map(appt => {
    const dt = new Date(appt.dateTime);
    return {
      ...appt,
      displayDate: dt.toLocaleDateString("pt-BR", {
        weekday: "long", day: "numeric", month: "long"
      }),
      displayTime: dt.toLocaleTimeString("pt-BR", {
        hour: "2-digit", minute: "2-digit"
      }),
      displaySubject: translateSubject(appt.subject),
      displayProfTitle: translateProfessorTitle(appt.professorTitle)
    };
  });

  // 4) empty state padronizado
  if (items.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        Nenhum agendamento encontrado.
      </div>
    );
  }

  // 5) aplica filtro e render normal
  const visible = items.filter(app => {
    switch (filter) {
      case "ALL":       return true;
      case "UPCOMING":  return ["SCHEDULED", "CANCELLED"].includes(app.status);
      case "CONFIRMED": return app.status === "SCHEDULED";
      case "PENDING":   return app.status === "PENDING";
      case "CANCELLED": return app.status === "CANCELLED";
      case "COMPLETED": return app.status === "COMPLETED";
      case "ONLINE":    return app.online;
      case "OFFLINE":   return !app.online;
      default:          return true;
    }
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map(app => (
          <AppointmentCard
            key={app.id}
            subject={app.displaySubject}
            professorName={app.professorName}
            professorTitle={app.displayProfTitle}
            professorImageUrl={app.professorImageUrl}
            date={app.displayDate}
            time={app.displayTime}
            duration={`${app.duration}min`}
            location={app.location}
            status={app.status}
            online={app.online}
            onDetailsClick={() => {
              setSelected(app);
              setOpenModal(true);
            }}
          />
        ))}
      </div>

      <AppointmentModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        appointment={selected}
        onUpdate={fetchAppointments}
      />
    </>
  );
};
