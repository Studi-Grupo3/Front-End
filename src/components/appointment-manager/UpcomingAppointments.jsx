import React, { useState } from "react";
import { AppointmentCard } from "./AppointmentCard";
import { AppointmentModal } from "./AppointmentModal";

export const UpcomingAppointments = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAppointment(null);
  };

  const appointments = [
    {
      subject: "Matemática",
      topic: "Funções Trigonométricas",
      professorName: "Prof. Carlos Eduardo",
      professorTitle: "Professor(a) de Matemática",
      professorImageUrl: "/lovable-uploads/09a24ead-9c40-487a-a233-8c1f43dcc6df.png",
      date: "domingo, 9 de julho",
      time: "14:00",
      duration: "1h30min",
      location: "Online",
      status: "confirmed",
      online: true,
    },
    {
      subject: "Física",
      topic: "Leis de Newton",
      professorName: "Prof. Ana Beatriz",
      professorTitle: "Professora de Física",
      professorImageUrl: "/lovable-uploads/ana-beatriz.png",
      date: "segunda-feira, 10 de julho",
      time: "10:00",
      duration: "1h",
      location: "Sala 203, Prédio B",
      status: "pending",
      online: false,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment, index) => (
          <AppointmentCard
            key={index}
            {...appointment}
            onDetailsClick={() => handleOpenModal(appointment)}
          />
        ))}
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        appointment={selectedAppointment}
      />
    </>
  );
};
