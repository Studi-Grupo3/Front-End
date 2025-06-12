import React from 'react';
import { translateSubject, translateAppointmentStatus } from '../utils/tradutionUtils';

const LinhaAula = ({
  studentName,
  subject,
  disciplina,
  date,
  time,
  duration,
  lessonDuration,
  status,
  semAcao = false
}) => {
  const [year, month, day] = date?.split('-') || [];
  const dataFormatada = day && month && year ? `${day}/${month}/${year}` : '---';
  const horario = time ? time.slice(0,5) : '---';

  const rawSubject = subject ?? disciplina ?? '';
  const disciplinaTraduzida = rawSubject ? translateSubject(rawSubject) : '---';

  const duracao = duration ?? lessonDuration;
  const duracaoTexto = duracao ? `${duracao} min` : '---';

  const statusClasses = {
    SCHEDULED: 'bg-yellow-100 text-yellow-800',
    COMPLETED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
  };
  const statusTraduzido = translateAppointmentStatus
    ? translateAppointmentStatus(status)
    : status;

  return (
    <tr>
      <td className="px-4 py-2 border" style={{ borderColor: '#E2E8F0' }}>{studentName}</td>
      <td className="px-4 py-2 border" style={{ borderColor: '#E2E8F0' }}>{disciplinaTraduzida}</td>
      <td className="px-4 py-2 border" style={{ borderColor: '#E2E8F0' }}>{dataFormatada}</td>
      <td className="px-4 py-2 border" style={{ borderColor: '#E2E8F0' }}>{horario}</td>
      <td className="px-4 py-2 border" style={{ borderColor: '#E2E8F0' }}>{duracaoTexto}</td>
      <td className="px-4 py-2 border" style={{ borderColor: '#E2E8F0' }}>
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
          {statusTraduzido}
        </span>
      </td>
    </tr>
  );
};

export default LinhaAula;