import React from 'react';
import { AppointmentCard } from './AppointmentCard';

export const UpcomingAppointments = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AppointmentCard
        subject="Matemática"
        topic="Funções Trigonométricas"
        professorName="Prof. Carlos Eduardo"
        professorTitle="Professor(a) de Matemática"
        professorImageUrl="/lovable-uploads/09a24ead-9c40-487a-a233-8c1f43dcc6df.png"
        date="domingo, 9 de julho"
        time="14:00"
        duration="1h30min"
        location="Online"
        status="confirmed"
        online={true}
      />
      <AppointmentCard
        subject="Física"
        topic="Leis de Newton"
        professorName="Prof. Ana Beatriz"
        professorTitle="Professora de Física"
        professorImageUrl="/lovable-uploads/ana-beatriz.png"
        date="segunda-feira, 10 de julho"
        time="10:00"
        duration="1h"
        location="Sala 203, Prédio B"
        status="pending"
        online={false}
      />
      <AppointmentCard
        subject="Química"
        topic="Tabela Periódica"
        professorName="Prof. João Lima"
        professorTitle="Professor de Química"
        professorImageUrl="/lovable-uploads/joao-lima.png"
        date="terça-feira, 11 de julho"
        time="16:30"
        duration="1h30min"
        location="Online"
        status="canceled"
        online={true}
      />
    </div>
  );
};
