import React, { useState, useEffect } from 'react';
import { appointmentService }  from '../../services/appointmentService';
import { AppointmentCard } from './AppointmentCard';
import { translateSubject } from '../../utils/tradutionUtils';
import { translateProfessorTitle } from '../../utils/tradutionUtils';

export const PastAppointments = () => {
  const [past, setPast]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    appointmentService
      .list()
      .then(data => {
        const completed = data.filter(a => a.status === 'COMPLETED');
        setPast(completed);
      })
      .catch(err => {
        console.error(err);
        setError('Não foi possível carregar o histórico.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando histórico...</div>;
  if (error)   return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {past.map(appt => {
        const dt = new Date(appt.dateTime);
        const dateStr = dt.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
        const timeStr = dt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        return (
          <AppointmentCard
            key={appt.id}
            subject={translateSubject(appt.subject)}
            topic={appt.topic}                 // ← ATENÇÃO: campo ausente no seu JSON
            professorName={appt.professorName}
            professorTitle={translateProfessorTitle(appt.professorTitle)}
            professorImageUrl={appt.professorImageUrl}
            date={dateStr}
            time={timeStr}
            duration={`${appt.duration}min`}
            location={appt.location}
            status="completed"
            online={appt.online}
          />
        );
      })}
    </div>
  );
};
