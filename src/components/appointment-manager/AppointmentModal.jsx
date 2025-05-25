// components/AppointmentModal.jsx
import React, { useEffect, useRef } from "react";
import { X, Calendar, Clock, MapPin, FileText } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import {
  translateSubject,
  translateProfessorTitle,
  translateWeekday,
  translateMonth,
  translateAppointmentStatus
} from "../../utils/tradutionUtils";

export const AppointmentModal = ({ isOpen, onClose, appointment }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen || !appointment) return null;

  // 1) formata data e hora
  const dt = new Date(appointment.dateTime);
  const weekdayPt = translateWeekday(
    dt.toLocaleDateString("en-US", { weekday: "long" })
  );
  const monthPt = translateMonth(
    dt.toLocaleDateString("en-US", { month: "long" })
  );
  const dayNum = dt.getDate();
  const formattedDate = `${weekdayPt}, ${dayNum} de ${monthPt}`;
  const formattedTime = dt.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  // 2) traduz subject, professorTitle e status
  const subjectPt       = translateSubject(appointment.subject);
  const professorTitlePt = translateProfessorTitle(appointment.professorTitle);
  const statusPt         = translateAppointmentStatus(appointment.status);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-[95%] max-w-xl p-6"
      >
        {/* Header */}
        <div className="flex justify-between items-start border-b pb-4">
          <h2 className="text-xl font-bold text-[var(--azul-custom)]">
            {subjectPt}
          </h2>
          <div className="flex items-center gap-2">
            <StatusBadge status={statusPt} />
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Professor */}
        <div className="flex items-center mt-4">
          <img
            src={appointment.professorImageUrl}
            alt={appointment.professorName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-3">
            <p className="text-gray-800 font-medium">
              {appointment.professorName}
            </p>
            <p className="text-gray-600 text-sm">
              {professorTitlePt}
            </p>
          </div>
        </div>

        {/* Infos */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-2 text-[var(--azul-custom)]" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-2 text-[var(--azul-custom)]" />
            <span>
              {formattedTime} • Duração: {appointment.duration}min
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2 text-[var(--azul-custom)]" />
            <span>
              {appointment.online ? "Online" : appointment.location}
            </span>
          </div>
        </div>

        {/* Material de apoio (mock) */}
        <div className="mt-6 border-t pt-4">
          <div className="flex items-center font-semibold text-gray-800 mb-2">
            <FileText className="w-5 h-5 mr-2 text-gray-700" />
            Material de apoio
          </div>
          <ul className="list-disc list-inside text-blue-600 text-sm space-y-1">
            <li>
              <a href="#" className="hover:underline">
                Documento de referência.pdf
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Exercícios sugeridos.pdf
              </a>
            </li>
          </ul>
        </div>

        {/* Botões */}
        <div className="mt-6 flex justify-end gap-2 border-t pt-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition">
            Cancelar aula
          </button>
          <button className="bg-orange-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-500 transition">
            Reagendar aula
          </button>
        </div>
      </div>
    </div>
  );
};
