import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/calendar-css.css";
import { appointmentService }      from "../../services/appointmentService";
import { translateSubject }        from "../../utils/tradutionUtils";
import { translateProfessorTitle } from "../../utils/tradutionUtils";
import { statusStyles }            from "./StatusBadge";

export const CalendarView = ({ filter, setActiveTab }) => {
  const [value, setValue] = useState(new Date());
  const [aulas, setAulas] = useState([]);

  useEffect(() => {
    appointmentService
      .list()
      .then(data => {
        const mapped = data
          .map(app => {
            const d = new Date(app.dateTime);
            return {
              ...app,
              dateObj: d,
              displaySubject: translateSubject(app.subject),
              displayProfTitle: translateProfessorTitle(app.professorTitle),
              displayDate: d.toLocaleDateString("pt-BR", {
                weekday: "long",
                day:     "numeric",
                month:   "long",
                year:    "numeric",
              }),
            };
          })
          .filter(app => {
            switch (filter) {
              case "UPCOMING":
                return app.status === "SCHEDULED" || app.status === "CANCELLED";
              case "CONFIRMED":
                return app.status === "SCHEDULED";
              case "PENDING":
                return app.status === "PENDING";
              case "CANCELLED":
                return app.status === "CANCELLED";
              case "COMPLETED":
                return app.status === "COMPLETED";
              case "ONLINE":
                return app.online;
              case "OFFLINE":
                return !app.online;
              default:
                return app.status !== "COMPLETED";
            }
          });

        setAulas(mapped);
      })
      .catch(err => console.error(err));
  }, [filter]);

  const getStatusForDate = date => {
    const found = aulas.find(a =>
      a.dateObj.getFullYear() === date.getFullYear() &&
      a.dateObj.getMonth()     === date.getMonth() &&
      a.dateObj.getDate()      === date.getDate()
    );
    return found?.status;
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 px-4 py-8">
      <div className="w-full lg:w-2/3">
        <div className="bg-white shadow-md rounded-xl p-4">
          <Calendar
            onChange={setValue}
            value={value}
            className="w-full react-calendar-custom"
            tileContent={({ date }) => {
              const status = getStatusForDate(date);
              if (!status) return null;
              const rawColor = statusStyles[status]?.rawColor;
              if (!rawColor) return null;
              return (
                <div className="flex justify-center mt-1">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: rawColor }}
                  />
                </div>
              );
            }}
          />

          <div className="mt-4 bg-gray-100 rounded-lg p-3">
            <h4 className="font-semibold mb-2 text-base sm:text-lg">Legenda</h4>
            <div className="flex flex-wrap gap-4 text-xs sm:text-sm md:text-base">
              {Object.entries(statusStyles).map(([key, { rawColor, text }]) => (
                <div key={key} className="flex items-center gap-1">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: rawColor }}
                  />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/3">
        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-lg font-bold mb-4">Próximas aulas</h3>
          {aulas
            .filter(app => app.status !== "COMPLETED")
            .filter(app =>
              filter === "ALL"
                ? (app.status === "SCHEDULED" || app.status === "CANCELLED")
                : true
            )
            .map((a, i) => {
              const bgColor = statusStyles[a.status]?.rawColor + "33";
              return (
                <div
                  key={i}
                  className="p-3 rounded mb-3"
                  style={{ backgroundColor: bgColor }}
                >
                  <p className="font-semibold">{a.displaySubject}</p>
                  <p className="text-sm text-gray-600">{a.displayDate}</p>
                </div>
              );
            })}
          <button
            onClick={() => setActiveTab("upcoming")}
            className="mt-2 w-full bg-gray-200 hover:bg-gray-300 transition text-sm rounded px-4 py-2"
          >
            Ver lista completa
          </button>
        </div>
      </div>
    </div>
  );
};
