// src/pages/AppointmentManager.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FilterButton } from "../components/appointment-manager/FilterButton";
import { ScheduleButton } from "../components/appointment-manager/ScheduleButton";
import { TabNav } from "../components/appointment-manager/TabNav";
import { UpcomingAppointments } from "../components/appointment-manager/UpcomingAppointments";
import { AllAppointments } from "../components/appointment-manager/AllAppointments";
import { CalendarView } from "../components/appointment-manager/CalendarView";
import NavbarPanel from "../components/NavbarPanel";

const FILTER_LABELS = {
  ALL:       "Todos os filtros",
  CONFIRMED: "Aulas Agendadas",
  COMPLETED: "Aulas Concluídas",
  CANCELLED: "Aulas Canceladas",
  ONLINE:    "Aulas Online",
  OFFLINE:   "Aulas Presenciais",
};

export const AppointmentManager = () => {
  const navigate = useNavigate();
  const { tab } = useParams(); 

  const tabMapping = {
    "proximas-aulas": "upcoming",
    historico:        "past",
    calendario:       "calendar",
  };

  const mappedTabFromParams = tabMapping[tab] || "upcoming";

  const [activeTab, setActiveTab] = useState(mappedTabFromParams);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const novoMapped = tabMapping[tab] || "upcoming";
    setActiveTab(novoMapped);
  }, [tab]); 

  const handleTabChange = (newTabId) => {
    const translated = tabMapping[newTabId] || "upcoming";
    setFilter("ALL");
    setActiveTab(translated);
    navigate(`/agendamentos/gerenciar/${newTabId}`, { replace: true });
  };

  const portugueseActiveTab =
    Object.keys(tabMapping).find((key) => tabMapping[key] === activeTab) ||
    "proximas-aulas";

  const commonProps = { filter, setFilter };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <NavbarPanel />
      <main className="w-5/6 mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-3">
          Acompanhe seus agendamentos
        </h1>

        <div className="flex justify-between items-center mb-6">
          <TabNav
            tabs={[
              { id: "proximas-aulas", label: "Próximas Aulas" },
              { id: "historico",      label: "Todas as Aulas" },
              { id: "calendario",     label: "Calendário" },
            ]}
            activeTab={portugueseActiveTab}
            onChange={handleTabChange}
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

        {activeTab === "upcoming" && <UpcomingAppointments {...commonProps} />}
        {activeTab === "past"     && <AllAppointments      {...commonProps} />}
        {activeTab === "calendar" && <CalendarView         {...commonProps} />}
      </main>
    </div>
  );
};
