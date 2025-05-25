import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/calendar-css.css';
import { appointmentService }      from '../../services/appointmentService';
import { translateSubject }        from '../../utils/tradutionUtils';
import { translateProfessorTitle } from '../../utils/tradutionUtils';

export const CalendarView = ({ filter, setActiveTab }) => {
  const [value, setValue] = useState(new Date());
  const [aulas, setAulas] = useState([]);

  useEffect(() => {
    appointmentService
      .list()
      .then(data => {
        const mapped = data.map(app => {
          const d = new Date(app.dateTime);
          let statusPt;
          switch (app.status) {
            case 'SCHEDULED': statusPt = 'confirmada'; break;
            case 'PENDING':   statusPt = 'pendente';   break;
            case 'CANCELLED': statusPt = 'cancelada';  break;
            default:          statusPt = app.status.toLowerCase();
          }
          return {
            ...app,
            dateObj:        d,
            statusPt,
            displaySubject: translateSubject(app.subject),
            displayProfTitle: translateProfessorTitle(app.professorTitle),
            displayDate:    d.toLocaleDateString('pt-BR', {
                              weekday:'long', day:'numeric', month:'long', year:'numeric'
                            })
          };
        });

        const filtered = mapped.filter(app => {
          switch (filter) {
            case 'CONFIRMED': return app.status === 'SCHEDULED';
            case 'PENDING':   return app.status === 'PENDING';
            case 'CANCELLED': return app.status === 'CANCELLED';
            case 'ONLINE':    return app.online === true;
            case 'OFFLINE':   return app.online === false;
            default:          return true;
          }
        });

        setAulas(filtered);
      })
      .catch(err => console.error(err));
  }, [filter]);

  const getAulaStatus = date => {
    const found = aulas.find(a =>
      a.dateObj.getFullYear() === date.getFullYear() &&
      a.dateObj.getMonth()     === date.getMonth() &&
      a.dateObj.getDate()      === date.getDate()
    );
    return found?.statusPt;
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
              const status = getAulaStatus(date);
              if (!status) return null;
              const colorMap = {
                confirmada: 'bg-green-500',
                pendente:   'bg-yellow-500',
                cancelada:  'bg-red-500',
              };
              return (
                <div className="flex justify-center mt-1">
                  <span className={`w-2 h-2 rounded-full ${colorMap[status]}`} />
                </div>
              );
            }}
          />
          <div className="mt-4 bg-gray-100 rounded-lg p-3">
            <h4 className="font-semibold mb-2 text-base sm:text-lg">Legenda</h4>
            <div className="flex flex-wrap gap-4 text-xs sm:text-sm md:text-base">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-green-500" /> Aula Confirmada
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-yellow-500" /> Aula Pendente
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-500" /> Aula Cancelada
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/3">
        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-lg font-bold mb-4">Próximas aulas</h3>

          {aulas.map((a, i) => {
            const bgMap = {
              confirmada: 'bg-green-100',
              pendente:   'bg-yellow-100',
              cancelada:  'bg-red-100',
            };
            return (
              <div key={i} className={`${bgMap[a.statusPt]} p-3 rounded mb-3`}>
                <p className="font-semibold">{a.displaySubject}</p>
                <p className="text-sm text-gray-600">{a.displayDate}</p>
              </div>
            );
          })}

          <button
            onClick={() => setActiveTab('upcoming')}
            className="mt-2 w-full bg-gray-200 hover:bg-gray-300 transition text-sm rounded px-4 py-2"
          >
            Ver lista completa
          </button>
        </div>
      </div>
    </div>
  );
};
