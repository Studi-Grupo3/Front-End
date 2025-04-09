const UserAvatar = ({ name }) => {
    const getInitials = (name) => {
      const names = name.trim().split(" ");
      const initials = names.map((n) => n[0].toUpperCase()).join("");
      return initials.slice(0, 2); // só pega 2 letras
    };
  
    return (
      <div className="w-10 h-10 bg-[#2462C2] text-white rounded-full flex items-center justify-center font-bold cursor-pointer">
        {getInitials(name)}
      </div>
    );
  };

  export default UserAvatar;
  