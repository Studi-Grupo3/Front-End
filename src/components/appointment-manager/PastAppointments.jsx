import React from 'react';
import { AppointmentCard } from './AppointmentCard';

export const PastAppointments = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AppointmentCard
        subject="História"
        topic="Revolução Francesa"
        professorName="Prof. Helena Souza"
        professorTitle="Professora de História"
        professorImageUrl="/lovable-uploads/helena-souza.png"
        date="quarta-feira, 3 de julho"
        time="08:00"
        duration="1h"
        location="Online"
        status="completed"
        online={true}
      />
      <AppointmentCard
        subject="Inglês"
        topic="Simple Past vs Present Perfect"
        professorName="Prof. Michael Scott"
        professorTitle="Professor de Inglês"
        professorImageUrl="/lovable-uploads/michael-scott.png"
        date="sexta-feira, 5 de julho"
        time="11:30"
        duration="1h"
        location="Sala 102, Bloco A"
        status="completed"
        online={false}
      />
    </div>
  );
};
