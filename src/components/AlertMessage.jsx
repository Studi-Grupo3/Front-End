const AlertMessage = ({ message, type, onClose }) => {
    const bgColor =
      type === 'success'
        ? 'bg-green-500'
        : type === 'error'
        ? 'bg-red-500'
        : 'bg-gray-500';
  
    return (
      <div className={`fixed top-5 right-5 z-50 text-white px-4 py-2 rounded shadow-lg ${bgColor}`}>
        <div className="flex items-center justify-between gap-4">
          <span>{message}</span>
          <button onClick={onClose} className="text-sm font-bold">X</button>
        </div>
      </div>
    );
  };
  
  export default AlertMessage;
  