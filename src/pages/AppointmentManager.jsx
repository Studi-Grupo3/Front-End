import React, { useState } from 'react';
import { FilterButton } from '../components/appointment-manager/FilterButton';
import { ScheduleButton } from '../components/appointment-manager/ScheduleButton';
import { TabNav } from '../components/appointment-manager/TabNav';
import { UpcomingAppointments } from '../components/appointment-manager/UpcomingAppointments';
import { PastAppointments } from '../components/appointment-manager/PastAppointments';
import { CalendarView } from '../components/appointment-manager/CalendarView';

export const AppointmentManager = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const tabs = [
    { id: 'upcoming', label: 'Próximas aulas' },
    { id: 'past', label: 'Aulas Passadas' },
    { id: 'calendar', label: 'Calendário' },
  ];

  const handleNewSchedule = () => {
    console.log('Scheduling new class');
  };

  const handleFilter = () => {
    console.log('Opening filters');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'upcoming':
        return <UpcomingAppointments />;
      case 'past':
        return <PastAppointments />;
      case 'calendar':
        return <CalendarView />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <main className="w-5/6 mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Acompanhe seus agendamentos</h1>

        <div className="flex justify-between items-center mb-6">
          <TabNav
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          <div className="flex space-x-3">
            <FilterButton onClick={handleFilter} />
            <ScheduleButton onClick={handleNewSchedule} />
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};
