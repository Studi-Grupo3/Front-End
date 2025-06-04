import React from 'react';

export function ConfirmationModal({ 
  isOpen, 
  title, 
  message, 
  confirmLabel = 'Confirmar', 
  onCancel, 
  onConfirm 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-sm p-6">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="text-base text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            Voltar
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
