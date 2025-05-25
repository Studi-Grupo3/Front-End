import React, { useState } from 'react';
import { FilterButton }       from '../components/appointment-manager/FilterButton';
import { ScheduleButton }     from '../components/appointment-manager/ScheduleButton';
import { TabNav }             from '../components/appointment-manager/TabNav';
import { UpcomingAppointments } from '../components/appointment-manager/UpcomingAppointments';
import { PastAppointments }     from '../components/appointment-manager/PastAppointments';
import { CalendarView }         from '../components/appointment-manager/CalendarView';
import NavbarPanel             from '../components/NavbarPanel';

const FILTER_LABELS = {
  ALL:       'Todos os filtros',
  CONFIRMED: 'Aulas Agendadas',
  PENDING:   'Aulas Concluídas',
  CANCELLED: 'Aulas Canceladas',
  ONLINE:    'Aulas Online',
  OFFLINE:   'Aulas Presenciais',
};

export const AppointmentManager = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [filter, setFilter]       = useState('ALL');

  const commonProps = { filter, setActiveTab };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <NavbarPanel />
      <main className="w-5/6 mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Acompanhe seus agendamentos
        </h1>

        <div className="flex justify-between items-center mb-6">
          <TabNav tabs={[
              { id: 'upcoming', label: 'Próximas aulas' },
              { id: 'past',     label: 'Aulas Passadas' },
              { id: 'calendar', label: 'Calendário' },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          <div className="flex space-x-3">
            <FilterButton
              labels={FILTER_LABELS}
              selectedFilter={filter}
              onSelectFilter={setFilter}
            />
            <ScheduleButton />
          </div>
        </div>

        {activeTab === 'upcoming' && <UpcomingAppointments {...commonProps} />}
        {activeTab === 'past'     && <PastAppointments     {...commonProps} />}
        {activeTab === 'calendar' && <CalendarView         {...commonProps} />}
      </main>
    </div>
  );
};
