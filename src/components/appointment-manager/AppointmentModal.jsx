import React, { useEffect, useRef } from "react";
import { X, Calendar, Clock, MapPin, AlignLeft, FileText } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

export const AppointmentModal = ({ isOpen, onClose, appointment }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen || !appointment) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-xl transform transition-all duration-300 ease-out p-6"
      >
        {/* Header */}
        <div className="flex justify-between items-start border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-blue-700">{appointment.subject}</h2>
            <p className="text-gray-700">{appointment.topic}</p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={appointment.status} />
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
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
            <p className="text-gray-800 font-medium">{appointment.professorName}</p>
            <p className="text-gray-600 text-sm">{appointment.professorTitle}</p>
          </div>
        </div>

        {/* Infos */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-2 text-blue-700" />
            <span>{appointment.date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-2 text-blue-700" />
            <span>{appointment.time} • Duração: {appointment.duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2 text-blue-700" />
            <span>{appointment.online ? "Online" : appointment.location}</span>
          </div>
        </div>

        {/* Descrição */}
        <div className="mt-6 border-t pt-4">
          <div className="flex items-center font-semibold text-gray-800 mb-2">
            <AlignLeft className="w-5 h-5 mr-2 text-gray-700" />
            Descrição da aula
          </div>
          <p className="text-sm text-gray-700">
            Nesta aula vamos revisar as principais funções trigonométricas: seno, cosseno e tangente.
            Vamos resolver exercícios práticos e discutir aplicações reais.
          </p>
        </div>

        {/* Linha divisória */}
        <hr className="my-4 border-gray-600" />

        {/* Material de apoio */}
        <div>
          <div className="flex items-center font-semibold text-gray-800 mb-2">
            <FileText className="w-5 h-5 mr-2 text-gray-700" />
            Material de apoio
          </div>
          <ul className="list-disc list-inside text-blue-600 text-sm space-y-1">
            <li><a href="#" className="hover:underline">Apostila de Trigonometria.pdf</a></li>
            <li><a href="#" className="hover:underline">Lista de Exercícios - Funções Trigonométricas.pdf</a></li>
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
