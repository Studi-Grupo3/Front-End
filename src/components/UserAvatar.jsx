const UserAvatar = ({ name, hasNotification = false }) => {
  const getInitials = (name) => {
    const names = name.trim().split(" ");
    const initials = names.map((n) => n[0].toUpperCase()).join("");
    return initials.slice(0, 2);
  };

  return (
    <div className="relative">
      <div
        className="w-10 h-10 bg-[#2462C2] text-white rounded-full flex items-center justify-center font-bold cursor-pointer"
        title={name}
        aria-label={`Avatar de ${name}`}
      >
        {getInitials(name)}
      </div>

      {hasNotification && (
        <>
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-orange-400 border-2 border-white"></span>
          <span className="animate-ping absolute -top-1 -right-1 h-3 w-3 rounded-full bg-orange-400 opacity-75"></span>
        </>
      )}
    </div>
  );
};

export default UserAvatar;
