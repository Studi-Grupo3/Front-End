// components/ConfirmationModal.jsx
import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

/**
 * ConfirmationModal com checkbox de confirmação.
 * Props:
 * - isOpen: boolean
 * - title: string
 * - message: string (parágrafos separados por '\n\n')
 * - checkboxLabel: string
 * - confirmLabel: string
 * - confirmColor: 'red' | 'green' | string (classes customizadas ou padrões 'red' e 'green')
 * - onCancel: () => void
 * - onConfirm: () => void
 */
export function ConfirmationModal({ 
  isOpen, 
  title, 
  message, 
  checkboxLabel = 'Li e concordo com a ação',
  confirmLabel = 'Confirmar', 
  confirmColor = 'red', 
  onCancel, 
  onConfirm 
}) {
  const modalRef = useRef();
  const [checked, setChecked] = useState(false);

  // Reset checkbox quando o modal abre
  useEffect(() => {
    if (isOpen) {
      setChecked(false);
    }
  }, [isOpen]);

  // Fecha com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onCancel]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onCancel();
    }
  };

  if (!isOpen) return null;

  // Determina classes de cor do botão de confirmação
  const getConfirmClasses = () => {
    // para cores 'red' ou 'green', usa padrões Tailwind; para outros valores, assume classe direta
    if (confirmColor === 'green') {
      return checked 
        ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer' 
        : 'bg-green-300 cursor-not-allowed text-white';
    }
    if (confirmColor === 'red') {
      return checked 
        ? 'bg-red-600 hover:bg-red-700 text-white cursor-pointer' 
        : 'bg-red-300 cursor-not-allowed text-white';
    }
    // caso confirmColor seja string de classes customizadas
    // assume que o usuário passará classes completas como 'bg-blue-600 hover:bg-blue-700 text-white'
    return checked 
      ? `${confirmColor} cursor-pointer` 
      : 'opacity-50 cursor-not-allowed';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20" onClick={handleClickOutside}>
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-[90%] max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-700 cursor-pointer" aria-label="Fechar modal">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="text-base text-gray-700 mb-4 space-y-2">
          {message.split("\n\n").map((par, idx) => (
            <p key={idx}>{par}</p>
          ))}
        </div>
        <div className="flex items-center mb-4">
          <input
            id="confirm-checkbox"
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(prev => !prev)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded cursor-pointer"
          />
          <label htmlFor="confirm-checkbox" className="ml-2 text-gray-800 text-sm cursor-pointer">
            {checkboxLabel}
          </label>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            Voltar
          </button>
          <button
            onClick={onConfirm}
            disabled={!checked}
            className={`px-5 py-2 rounded-md transition ${getConfirmClasses()}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}