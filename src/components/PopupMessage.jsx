import { useEffect } from 'react';

export const PopupMessage = ({ message, type = 'info', onClose, duration = 4000 }) => {
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }[type] || 'bg-gray-500';

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!message) return null;

  return (
    <div className={`fixed top-5 right-5 z-50 text-white px-4 py-2 rounded shadow-lg ${bgColor}`}>
      <div className="flex items-center justify-between gap-4">
        <span>{message}</span>
        <button onClick={onClose} className="text-sm font-bold">X</button>
      </div>
    </div>
  );
};
