import React, { useState, useEffect } from "react";
import { appointmentService }      from "../../services/appointmentService";
import { AppointmentCard }         from "./AppointmentCard";
import { AppointmentModal }        from "./AppointmentModal";
import { translateSubject }        from "../../utils/tradutionUtils";
import { translateProfessorTitle } from "../../utils/tradutionUtils";

export const UpcomingAppointments = ({ filter, setActiveTab }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);
  const [selected,     setSelected]     = useState(null);
  const [openModal,    setOpenModal]    = useState(false);

  useEffect(() => {
    appointmentService
      .list()
      .then(data => setAppointments(data))
      .catch(() => setError("Não foi possível carregar."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando agendamentos...</div>;
  if (error)   return <div>{error}</div>;

  const items = appointments.map(appt => {
    const dt = new Date(appt.dateTime);
    return {
      ...appt,
      displayDate: dt.toLocaleDateString("pt-BR", {
        weekday: "long", day: "numeric", month: "long",
      }),
      displayTime: dt.toLocaleTimeString("pt-BR", {
        hour: "2-digit", minute: "2-digit",
      }),
      displaySubject: translateSubject(appt.subject),
      displayProfTitle: translateProfessorTitle(appt.professorTitle),
    };
  });

  let visible = [];
  if (filter === "COMPLETED") {
    visible = [];
  } else {
    visible = items.filter(app => {
      if (app.status === "COMPLETED") return false;

      switch (filter) {
        case "UPCOMING": 
          return app.status === "SCHEDULED" || app.status === "CANCELLED";
        case "CONFIRMED": 
          return app.status === "SCHEDULED";
        case "PENDING":   
          return app.status === "PENDING";
        case "CANCELLED":  
          return app.status === "CANCELLED";
        case "ONLINE":   
          return app.online;
        case "OFFLINE":  
          return !app.online;
        default: 
          return app.status === "SCHEDULED" || app.status === "CANCELLED";
      }
    });
  } 

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
      />
    </>
  );
};
