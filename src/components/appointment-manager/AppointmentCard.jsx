import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { StatusBadge, statusStyles } from "./StatusBadge";

export const AppointmentCard = ({
  subject,
  professorName,
  professorTitle,
  date,
  time,
  duration,
  location,
  status,
  online,
  onDetailsClick = () => {},
  professorImageUrl = "",
}) => {
  const locationDisplay = online ? "Online" : location;
  const borderColor = statusStyles[status]?.rawColor || "#22c55e";

  return (
    <div
      className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-sm p-4 sm:p-6 border-t-4"
      style={{ borderTopColor: borderColor }}
    >
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-[var(--azul-custom)] text-lg sm:text-xl font-bold">{subject}</h2>
        <StatusBadge status={status} />
      </div>

      {/* <p className="text-gray-700 text-sm sm:text-base font-medium mb-3 sm:mb-4">{topic}</p> */}

      <div className="flex items-center mb-3 sm:mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
          <img
            src={professorImageUrl}
            alt={professorName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="ml-2 sm:ml-3">
          <p className="text-gray-800 text-sm sm:text-base font-medium mb-0">{professorName}</p>
          <div className="flex items-center text-gray-600 text-xs sm:text-sm">
            <GraduationCap className="w-3 h-3 mr-1" />
            {professorTitle}
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-3 sm:mb-4">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[var(--azul-custom)]" />
          <span className="text-xs sm:text-sm">{date}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[var(--azul-custom)]" />
          <span className="text-xs sm:text-sm">
            {time} • Duração: {duration}
          </span>
        </div>

        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[var(--azul-custom)]" />
          <span className="text-xs sm:text-sm">{locationDisplay}</span>
        </div>
      </div>

      <button
        onClick={onDetailsClick}
        className="w-full border cursor-pointer border-gray-300 text-[var(--azul-custom)] rounded-lg py-2 px-4 hover:bg-blue-50 transition text-center text-sm sm:text-base"
      >
        <span className="font-medium">Ver Detalhes</span>
      </button>
    </div>
  );
};