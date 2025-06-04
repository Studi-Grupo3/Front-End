import React from 'react';

export function Modal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md p-6 relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>
        {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
        <div>{children}</div>
      </div>
    </div>
  );
}
