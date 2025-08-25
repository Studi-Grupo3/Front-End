import React, { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Scheduling({ data, onUpdate, onNext }) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = monthStart.getDay();
  const endDay = 6 - monthEnd.getDay();

  const prevDays = startDay
    ? eachDayOfInterval({
        start: new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
        end: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0),
      }).slice(-startDay)
    : [];

  const nextDays = endDay
    ? eachDayOfInterval({
        start: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
        end: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, endDay),
      })
    : [];

  const allDays = [...prevDays, ...monthDays, ...nextDays];
  const timeSlots = ['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];

  const selectDate = date => {
    onUpdate({ date });
    onUpdate({ time: null });
  };
  const selectTime = time => onUpdate({ time });
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const enabled = data.date && data.time;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full">
          <h2 className="text-base text-gray-700 font-medium mb-2">Selecione uma data:</h2>
          <div className="border border-gray-200 rounded-lg p-4 shadow-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <ChevronLeft className="h-4 w-4 text-gray-600" />
              </button>
              <span className="font-medium text-gray-800 capitalize">
                {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
              </span>
              <button onClick={nextMonth} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <ChevronRight className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 uppercase mb-2">
              {days.map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {allDays.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => selectDate(day)}
                  className={`h-8 w-8 mx-auto flex items-center justify-center rounded-full transition-colors cursor-pointer
                    ${!isSameMonth(day, currentMonth) ? 'text-gray-400' : 'text-gray-800'}
                    ${data.date && isSameDay(day, data.date) ? 'bg-[#3970B7] text-white' : 'hover:bg-gray-100'}`}
                >
                  {day.getDate()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col justify-between">
          <h2 className="text-base text-gray-700 font-medium mb-2">Selecione um horário:</h2>
          <div className="border border-gray-200 rounded-lg p-4 h-64 bg-gray-50 w-full">
            {!data.date ? (
              <p className="text-gray-500 text-center mt-24">Selecione uma data para ver os horários disponíveis</p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {timeSlots.map(ts => (
                  <button
                    key={ts}
                    onClick={() => selectTime(ts)}
                    className={`py-3 rounded-lg text-base font-medium text-center transition-colors cursor-pointer
                      ${data.time === ts ? 'bg-[#3970B7] text-white' : 'bg-gray-50 text-gray-800 hover:bg-gray-100'}`}
                  >
                    {ts}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={onNext}
            disabled={!enabled}
            className={`w-full py-4 mt-4 text-lg font-medium rounded-lg transition-colors
              ${enabled ? 'bg-[#3970B7] text-white hover:bg-[#2e5a94] cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            {enabled
              ? `Continuar para ${format(data.date, 'dd/MM/yyyy')} às ${data.time}`
              : 'Selecione uma data e horário'}
          </button>
        </div>
      </div>
    </div>
  );
}
