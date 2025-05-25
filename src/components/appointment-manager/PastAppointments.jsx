import React, { useState, useEffect } from 'react';
import { appointmentService }      from '../../services/appointmentService';
import { AppointmentCard }         from './AppointmentCard';
import { translateSubject }        from '../../utils/tradutionUtils';
import { translateProfessorTitle } from '../../utils/tradutionUtils';

export const PastAppointments = ({ filter }) => {
  const [past, setPast]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    appointmentService
      .list()
      .then(data => {
        const completed = data.filter(a => a.status === 'COMPLETED');
        setPast(completed);
      })
      .catch(() => setError('Não foi possível carregar o histórico.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando histórico...</div>;
  if (error)   return <div>{error}</div>;

  const items = past.map(appt => {
    const dt = new Date(appt.dateTime);
    return {
      ...appt,
      displayDate: dt.toLocaleDateString('pt-BR', {
        weekday: 'long', day: 'numeric', month: 'long'
      }),
      displayTime: dt.toLocaleTimeString('pt-BR', {
        hour: '2-digit', minute: '2-digit'
      }),
      displaySubject: translateSubject(appt.subject),
      displayProfTitle: translateProfessorTitle(appt.professorTitle),
    };
  });

  const visible = items.filter(app => {
    switch (filter) {
      case 'ONLINE':  return app.online === true;
      case 'OFFLINE': return app.online === false;
      default:        return true;
    }
  });

  return (
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
          status="completed"
          online={app.online}
        />
      ))}
    </div>
  );
};
