import React from "react";
import { Calendar, Clock, MapPin, Check, X, Clock as ClockIcon, GraduationCap } from "lucide-react";

export const AppointmentCard = ({
  subject,        
  topic,            
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

  const getStatusConfig = () => {
    switch (status) {
      case "confirmed":
        return {
          bgColor: "bg-green-500",
          textColor: "text-white",
          rawColor: "#22c55e",
          icon: <Check className="w-4 h-4" strokeWidth={3}/>,
          text: "Confirmado",
        };
      case "pending":
        return {
          bgColor: "bg-orange-500",
          textColor: "text-white",
          rawColor: "#f97316",
          icon: <ClockIcon className="w-4 h-4" strokeWidth={3} />,
          text: "Pendente",
        };
      case "canceled":
        return {
          bgColor: "bg-red-500",
          textColor: "text-white",
          rawColor: "#ef4444",
          icon: <X className="w-4 h-4" strokeWidth={3} />,
          text: "Cancelado",
        };
      default:
        return {
          bgColor: "bg-green-500",
          textColor: "text-white",
          rawColor: "#22c55e",
          icon: <Check className="w-4 h-4" strokeWidth={3} />,
          text: "Confirmado",
        };
    }
  };  

  const statusConfig = getStatusConfig();
  const locationDisplay = online ? "Online" : location;

  return (
    <div className={`w-[100%] max-w-xl mx-auto bg-white rounded-lg shadow-sm p-6 border-t-4`} style={{ borderTopColor: statusConfig.rawColor }}>
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-[var(--azul-custom)] text-xl font-bold">{subject}</h2>

        <div className={`${statusConfig.bgColor} ${statusConfig.textColor} font-bold px-3 py-1 rounded-full text-sm flex items-center`}>
          <span className="mr-1">{statusConfig.icon}</span>
          {statusConfig.text}
        </div>
      </div>

      <p className="text-gray-700 font-medium mb-4">{topic}</p>

      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={professorImageUrl} alt={professorName} className="w-full h-full object-cover" />
        </div>

        <div className="ml-3">
          <p className="text-gray-800 font-medium mb-0">{professorName}</p>
          <div className="flex items-center text-gray-600 text-sm">
            <GraduationCap className="w-3 h-3 mr-1" /> {professorTitle}
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-5 h-5 mr-2 text-[var(--azul-custom)]" />
          <span className="text-sm">{date}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Clock className="w-5 h-5 mr-2 text-[var(--azul-custom)]" />
          <span className="text-sm">{time} • Duração: {duration}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <MapPin className="w-5 h-5 mr-2 text-[var(--azul-custom)]" />
          <span className="text-sm">{locationDisplay}</span>
        </div>
      </div>

      <button
        onClick={onDetailsClick}
        className="w-full border border-gray-300 text-[var(--azul-custom)] rounded-lg py-2 px-4 hover:bg-blue-50 transition text-center"
      >
        <span className="font-medium">Ver Detalhes</span>
      </button>
    </div>
  );
};