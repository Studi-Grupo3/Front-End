// components/StatusBadge.jsx
import React from "react";
import { Check, X, Clock as ClockIcon } from "lucide-react";

export const statusStyles = {
  SCHEDULED: {
    bgColor:   "bg-yellow-500",
    textColor: "text-white",
    rawColor:  "#FFBB00",         // amarelo
    icon:      <ClockIcon className="w-4 h-4" />,
    text:      "Agendado",
  },
  COMPLETED: {
    bgColor:   "bg-green-500",
    textColor: "text-white",
    rawColor:  "#22c55e",         // verde
    icon:      <Check className="w-4 h-4" />,
    text:      "Concluído",
  },
  CANCELLED: {
    bgColor:   "bg-red-500",
    textColor: "text-white",
    rawColor:  "#ef4444",         // vermelho
    icon:      <X className="w-4 h-4" />,
    text:      "Cancelado",
  },
};

export const StatusBadge = ({ status }) => {
  const style = statusStyles[status] || statusStyles.SCHEDULED;
  return (
    <div
      className={`
        ${style.bgColor} ${style.textColor}
        px-2 py-1 rounded-full text-xs sm:text-sm
        flex items-center font-bold
      `}
    >
      <span className="mr-1">{style.icon}</span>
      <span>{style.text}</span>
    </div>
  );
};
