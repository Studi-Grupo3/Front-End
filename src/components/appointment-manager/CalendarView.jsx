// components/CalendarView.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/calendar-css.css";
import { appointmentService } from "../../services/appointmentService";
import { translateSubject, translateProfessorTitle } from "../../utils/tradutionUtils";
import { statusStyles } from "./StatusBadge";
import { DayAppointmentsModal } from "../../components/ui/DayAppointmentsModal";
import { AppointmentModal } from "../appointment-manager/AppointmentModal";

export const CalendarView = ({ filter, setActiveTab }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());
  const [rawAulas, setRawAulas] = useState([]);
  const [calendarAulas, setCalendarAulas] = useState([]);
  const [upcomingAulas, setUpcomingAulas] = useState([]);
  const [dayApps, setDayApps] = useState([]);
  const [dayModalOpen, setDayModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  // Mapeia dados em formato necessário
  const mapAppointments = data =>
    data.map(app => {
      const d = new Date(app.dateTime);
      return {
        ...app,
        dateObj: d,
        displaySubject: translateSubject(app.subject),
        displayProfTitle: translateProfessorTitle(app.professorTitle),
        displayDate: d.toLocaleDateString("pt-BR", {
          weekday: "long", day: "numeric", month: "long", year: "numeric"
        }),
        displayTime: d.toLocaleTimeString("pt-BR", {
          hour: "2-digit", minute: "2-digit"
        })
      };
    });

  // Carrega todas as aulas
  useEffect(() => {
    appointmentService.list()
      .then(data => setRawAulas(mapAppointments(data)))
      .catch(err => console.error(err));
  }, [filter]);

  // Atualiza listas derivadas
  useEffect(() => {
    // Filtra para o calendário, mostrando todos (incluindo COMPLETED) ou conforme filter
    const filteredForCalendar = rawAulas.filter(app => {
      switch (filter) {
        case "UPCOMING": return ["SCHEDULED", "CANCELLED"].includes(app.status);
        case "CONFIRMED": return app.status === "SCHEDULED";
        case "PENDING":   return app.status === "PENDING";
        case "CANCELLED": return app.status === "CANCELLED";
        case "COMPLETED": return app.status === "COMPLETED";
        case "ONLINE":    return app.online;
        case "OFFLINE":   return !app.online;
        default:           return true;
      }
    });
    setCalendarAulas(filteredForCalendar);

    // Próximas aulas apenas SCHEDULED
    const upcoming = rawAulas.filter(app => app.status === "SCHEDULED");
    setUpcomingAulas(upcoming);
    setCurrentPage(1);
  }, [rawAulas, filter]);

  // Paginação
  const totalPages = Math.ceil(upcomingAulas.length / pageSize);
  const paginated = upcomingAulas.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Status para cada dia
  const getStatusForDate = date => {
    const found = calendarAulas.find(a =>
      a.dateObj.getFullYear() === date.getFullYear() &&
      a.dateObj.getMonth() === date.getMonth() &&
      a.dateObj.getDate() === date.getDate()
    );
    return found?.status;
  };

  // Ao clicar no calendário
  const handleClickDay = date => {
    setValue(date);
    const selecionadas = calendarAulas.filter(a =>
      a.dateObj.getFullYear() === date.getFullYear() &&
      a.dateObj.getMonth() === date.getMonth() &&
      a.dateObj.getDate() === date.getDate()
    );
    setDayApps(selecionadas);
    setDayModalOpen(true);
  };


  // Abre modal de lista completa
  const handleViewFullList = () => {
    if (typeof setActiveTab === 'function') setActiveTab("upcoming");
    else navigate('/upcoming');
  };

  // Função para abrir modal de detalhes de uma aula
  const openAppointmentModal = appointment => {
    setDayModalOpen(false);
    setDayApps([]);
    setSelectedApp(appointment);
    setAppModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 px-4 py-8">
      {/* Calendário */}
      <div className="w-full lg:w-2/3">
        <div className="bg-white shadow-md rounded-xl p-4">
          <Calendar
            onChange={setValue}
            value={value}
            onClickDay={handleClickDay}
            className="w-full react-calendar-custom"
            tileContent={({ date }) => {
              const status = getStatusForDate(date);
              if (!status) return null;
              const rawColor = statusStyles[status]?.rawColor;
              if (!rawColor) return null;
              return (
                <div className="flex justify-center mt-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: rawColor }} />
                </div>
              );
            }}
          />
          {/* Legenda */}
          <div className="mt-4 bg-gray-100 rounded-lg p-3">
            <h4 className="font-semibold mb-2 text-base sm:text-lg">Legenda</h4>
            <div className="flex flex-wrap gap-4 text-xs sm:text-sm md:text-base">
              {Object.entries(statusStyles).map(([key, { rawColor, text }]) => (
                <div key={key} className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: rawColor }} />{text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Próximas aulas resumidas com paginação */}
      <div className="w-full lg:w-1/3">
        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-lg font-bold mb-4">Próximas aulas</h3>
          {paginated.map((a, i) => (
            <div
              key={i}
              onClick={() => openAppointmentModal(a)}
              className="p-3 rounded mb-3 cursor-pointer"
              style={{ backgroundColor: statusStyles[a.status]?.rawColor + "33" }}
            >
              <p className="font-semibold">{a.displaySubject}</p>
              <p className="text-sm text-gray-600">{a.displayDate}</p>
            </div>
          ))}
          {/* Paginação */}
          <div className="flex justify-between items-center mt-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              className="px-3 py-1 bg-gray-200 rounded cursor-pointer disabled:opacity-50"
            >Anterior</button>
            <span className="text-sm">{currentPage} de {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              className="px-3 py-1 bg-gray-200 rounded cursor-pointer disabled:opacity-50"
            >Próxima</button>
          </div>
          <button
            onClick={handleViewFullList}
            className="mt-2 w-full bg-gray-200 hover:bg-gray-300 transition text-sm rounded px-4 py-2 cursor-pointer"
          >Ver lista completa</button>
        </div>
      </div>

      {/* Modal de dia com múltiplas aulas */}
      <DayAppointmentsModal
        isOpen={dayModalOpen}
        onClose={() => setDayModalOpen(false)}
        appointments={dayApps}
        onUpdate={() => {
          appointmentService.list()
            .then(data => setRawAulas(mapAppointments(data)))
            .catch(err => console.error(err));
        }}
      />

      {/* Modal de detalhes de aula única */}
      {selectedApp && (
        <AppointmentModal
          isOpen={appModalOpen}
          onClose={() => setAppModalOpen(false)}
          appointment={selectedApp}
          onUpdate={() => {
            appointmentService.list()
              .then(data => setRawAulas(mapAppointments(data)))
              .catch(err => console.error(err));
          }}
        />
      )}
    </div>
  );
};
