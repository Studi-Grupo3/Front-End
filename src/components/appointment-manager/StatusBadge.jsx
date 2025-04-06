import React from "react";
import { Check, Clock as ClockIcon, X } from "lucide-react";

export const statusStyles = {
  confirmed: {
    bgColor: "bg-green-500",
    textColor: "text-white",
    rawColor: "#22c55e",
    icon: <Check className="w-4 h-4" strokeWidth={3} />,
    text: "Confirmado",
  },
  pending: {
    bgColor: "bg-orange-500",
    textColor: "text-white",
    rawColor: "#f97316",
    icon: <ClockIcon className="w-4 h-4" strokeWidth={3} />,
    text: "Pendente",
  },
  canceled: {
    bgColor: "bg-red-500",
    textColor: "text-white",
    rawColor: "#ef4444",
    icon: <X className="w-4 h-4" strokeWidth={3} />,
    text: "Cancelado",
  },
};

export const StatusBadge = ({ status = "confirmed" }) => {
  const { bgColor, textColor, icon, text } = statusStyles[status] || statusStyles.confirmed;

  return (
    <div className={`${bgColor} ${textColor} font-bold px-3 py-1 rounded-full text-sm flex items-center`}>
      <span className="mr-1">{icon}</span>
      {text}
    </div>
  );
};
