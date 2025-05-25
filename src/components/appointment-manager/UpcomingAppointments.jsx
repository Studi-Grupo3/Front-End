import React, { useState, useEffect } from 'react';
import { appointmentService }  from '../../services/appointmentService';
import { AppointmentCard }        from './AppointmentCard';
import { AppointmentModal }       from './AppointmentModal';
import { translateSubject }               from '../../utils/tradutionUtils';
import { translateProfessorTitle }          from '../../utils/tradutionUtils';

export const UpcomingAppointments = () => {
  const [appointments, setAppointments]       = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [error, setError]                     = useState(null);
  const [selectedAppointment, setSelected]    = useState(null);
  const [isModalOpen, setModalOpen]           = useState(false);

  useEffect(() => {
    appointmentService
      .list()
      .then(data => {
        // supondo que sua API já retorne só os futuros
        setAppointments(data);
      })
      .catch(err => {
        console.error(err);
        setError('Não foi possível carregar os agendamentos.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando agendamentos...</div>;
  if (error)   return <div>{error}</div>;

  const openModal = appt => {
    setSelected(appt);
    setModalOpen(true);
  };
  const closeModal = () => {
    setSelected(null);
    setModalOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map(appt => {
          // converte dateTime em date + time legível
          const dt = new Date(appt.dateTime);
          const dateStr = dt.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
          const timeStr = dt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

          return (
            <AppointmentCard
              key={appt.id}
              subject={translateSubject(appt.subject)}
              // topic={appt.topic}                     // ← ATENÇÃO: campo ausente no seu JSON
              professorName={appt.professorName}
              professorTitle={translateProfessorTitle(appt.professorTitle)}
              professorImageUrl={appt.professorImageUrl}
              date={dateStr}
              time={timeStr}
              duration={`${appt.duration}min`}
              location={appt.location}
              status={appt.status === 'SCHEDULED' ? 'confirmed' : appt.status.toLowerCase()}
              online={appt.online}
              onDetailsClick={() => openModal(appt)}
            />
          );
        })}
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        appointment={selectedAppointment}
      />
    </>
  );
};
