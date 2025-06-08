// components/DayAppointmentsModal.jsx
import React, { useState } from "react";
import { AppointmentCard } from "../appointment-manager/AppointmentCard";
import { AppointmentModal } from "../appointment-manager/AppointmentModal";

export function DayAppointmentsModal({
  isOpen,
  onClose,
  appointments,  // lista de aulas filtradas pelo dia
  onUpdate
}) {
  const [selected, setSelected] = useState(null);

  if (!isOpen) return null;
  if (appointments.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <p>Nenhuma aula agendada para este dia.</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-[#3970B7] text-white rounded cursor-pointer">
            Fechar
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh]">
          <h3 className="text-xl font-bold mb-4">Aulas de {appointments[0].displayDate}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map(app => (
              <AppointmentCard
                key={app.id}
                subject={app.displaySubject}
                professorName={app.professorName}
                professorTitle={app.displayProfTitle}
                professorImageUrl={app.professorImageUrl}
                date={app.displayDate}
                time={app.displayTime}
                duration={`${app.duration}min`}
                location={app.location}
                status={app.status}
                online={app.online}
                onDetailsClick={() => setSelected(app)}
              />
            ))}
          </div>
          <button
            onClick={onClose}
            className="mt-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>

      {/* Modal individual */}
      {selected && (
        <AppointmentModal
          isOpen={!!selected}
          onClose={() => setSelected(null)}
          appointment={selected}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}
