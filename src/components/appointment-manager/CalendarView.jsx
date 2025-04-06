import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/calendar-css.css';

// Exemplo de aulas
const aulas = [
  { date: new Date(2025, 5, 9), status: 'confirmada' },
  { date: new Date(2025, 5, 10), status: 'pendente' },
  { date: new Date(2025, 5, 11), status: 'cancelada' },
];

export const CalendarView = () => {
  const [value, setValue] = useState(new Date());

  // Função para verificar se há aula na data
  const getAulaStatus = (date) => {
    const dia = date.getDate();
    const mes = date.getMonth();
    const ano = date.getFullYear();

    const aula = aulas.find((a) => {
      return (
        a.date.getDate() === dia &&
        a.date.getMonth() === mes &&
        a.date.getFullYear() === ano
      );
    });

    return aula?.status;
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 px-4 py-8">
      {/* Calendário */}
      <div className="w-full md:w-2/3">
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
                pendente: 'bg-yellow-500',
                cancelada: 'bg-red-500',
              };

              return (
                <div className="flex justify-center mt-1">
                  <span
                    className={`w-2 h-2 rounded-full ${colorMap[status]}`}
                  ></span>
                </div>
              );
            }}
          />

          <div className="mt-4 bg-gray-100 rounded-lg p-3">
            <h4 className="font-semibold mb-2">Legenda</h4>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                Aula Confirmada
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                Aula Pendente
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                Aula Cancelada
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Próximas aulas */}
      <div className="w-full md:w-1/3">
        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-lg font-bold mb-4">Próximas aulas</h3>

          {aulas.map((aula, idx) => {
            const bgMap = {
              confirmada: 'bg-green-100',
              pendente: 'bg-yellow-100',
              cancelada: 'bg-red-100',
            };

            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const dataFormatada = aula.date.toLocaleDateString('pt-BR', options);

            return (
              <div key={idx} className={`${bgMap[aula.status]} p-3 rounded mb-3`}>
                <p className="font-semibold">Matemática</p>
                <p>Funções Trigonométricas</p>
                <p className="text-sm text-gray-600">{dataFormatada}</p>
              </div>
            );
          })}

          <button className="mt-2 w-full bg-gray-200 hover:bg-gray-300 transition text-sm rounded px-4 py-2">
            Ver lista completa
          </button>
        </div>
      </div>
    </div>
  );
};
