import React from "react";
import { Check, X, Clock as ClockIcon } from "lucide-react";

export const statusStyles = {
  confirmed: {
    bgColor: "bg-green-500",
    textColor: "text-white",
    icon: <Check className="w-3 h-3" />,
    text: "Confirmado",
    rawColor: "#22c55e"
  },
  pending: {
    bgColor: "bg-orange-500",
    textColor: "text-white",
    icon: <ClockIcon className="w-3 h-3" />,
    text: "Pendente",
    rawColor: "#f97316"
  },
  canceled: {
    bgColor: "bg-red-500",
    textColor: "text-white",
    icon: <X className="w-3 h-3" />,
    text: "Cancelado",
    rawColor: "#ef4444"
  },
  cancelled: {
    bgColor: "bg-red-500",
    textColor: "text-white",
    icon: <X className="w-3 h-3" />,
    text: "Cancelado",
    rawColor: "#ef4444"
  }
};

export const StatusBadge = ({ status }) => {
  const style = statusStyles[status] || statusStyles.confirmed;
  
  return (
    <div className={`${style.bgColor} ${style.textColor} px-2 py-1 rounded-full text-xs sm:text-sm flex items-center`}>
      <span className="mr-1">{style.icon}</span>
      <span className="font-medium text-xs">{style.text}</span>
    </div>
  );
};