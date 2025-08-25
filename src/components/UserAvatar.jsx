import React from "react";

const UserAvatar = ({ name = "", hasNotification = false, isComplete = false, onClick }) => {
  // Função para pegar as iniciais do nome
  function getInitials(name) {
    if (!name) return "";
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(word => word[0].toUpperCase())
      .join("");
  }

  const initials = getInitials(name);

  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      {/* Avatar */}
      <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm border border-gray-500">
        {initials}
      </div>

      {/* Notificação */}
      {hasNotification && (
        <>
          {/* Bolinha com animação ping */}
          <span
            className={`absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ${
              isComplete ? "bg-green-500" : "bg-yellow-400"
            } animate-ping`}
          ></span>
          {/* Bolinha sólida por cima */}
          <span
            className={`absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ${
              isComplete ? "bg-green-500" : "bg-yellow-400"
            }`}
          ></span>
        </>
      )}
    </div>
  );
};

export default UserAvatar;