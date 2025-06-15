import React, { useEffect, useRef, useState } from "react";
import { X, Calendar, Clock, MapPin, FileText, DollarSign } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { ConfirmationModal } from "../ui/ConfirmationModal";
import { appointmentService } from "../../services/appointmentService";
import {
  translateSubject,
  translateProfessorTitle,
  translateWeekday,
  translateMonth
} from "../../utils/tradutionUtils";

export const AppointmentModal = ({
  isOpen,
  onClose,
  appointment,
  onUpdate
}) => {
  const modalRef = useRef();
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [confirmCompleteOpen, setConfirmCompleteOpen] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleCancelClick = () => setConfirmCancelOpen(true);
  const handleCompleteClick = () => setConfirmCompleteOpen(true);

  const performUpdateStatus = async (newStatus) => {
    setLoadingAction(true);
    try {
      await appointmentService.patch(appointment.id, { status: newStatus });
      if (onUpdate) await onUpdate();
      onClose();
    } catch (error) {
      console.error(`Erro ao atualizar status para ${newStatus}:`, error);
      alert("Não foi possível atualizar o status. Tente novamente.");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleConfirmCancel = async () => {
    setConfirmCancelOpen(false);
    await performUpdateStatus("CANCELLED");
  };

  const handleConfirmComplete = async () => {
    setConfirmCompleteOpen(false);
    await performUpdateStatus("COMPLETED");
  };

  if (!isOpen || !appointment) return null;

  // formatação de data e hora
  const dt = new Date(appointment.dateTime);
  const weekdayPt = translateWeekday(dt.toLocaleDateString("en-US", { weekday: "long" }));
  const monthPt = translateMonth(dt.toLocaleDateString("en-US", { month: "long" }));
  const formattedDate = `${weekdayPt}, ${dt.getDate()} de ${monthPt}`;
  const formattedTime = dt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  const subjectPt = translateSubject(appointment.subject);
  const professorTitlePt = translateProfessorTitle(appointment.professorTitle);

  const cancelMessage = `
Tem certeza de que deseja CANCELAR esta aula?

Ao cancelar, você não poderá marcar essa aula como concluída posteriormente. Se tiver qualquer dúvida, entre em contato com o professor correspondente ou envie um email para studi@gmail.com antes de prosseguir.
  `.trim();

  const completeMessage = `
Tenha certeza de marcar a aula como CONCLUÍDA apenas se você realmente realizou a aula com o professor correspondente.

Caso tenha qualquer dúvida sobre o que registrar, consulte o professor correspondente ou envie um email para studi@gmail.com antes de confirmar a conclusão.
  `.trim();

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
        role="dialog"
        aria-modal="true"
        onClick={handleClickOutside}
      >
        <div
          ref={modalRef}
          className="bg-white rounded-xl shadow-2xl w-[90%] max-w-2xl p-6"
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b pb-4">
            <h2 className="text-xl font-bold text-[var(--azul-custom)]">
              {subjectPt}
            </h2>
            <div className="flex items-center gap-2">
              <StatusBadge status={appointment.status} />
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Professor */}
          <div className="flex items-center mt-4">
            <img
              src={appointment.professorImageUrl}
              alt={appointment.professorName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-3">
              <p className="text-gray-800 font-medium">
                {appointment.professorName}
              </p>
              <p className="text-gray-600 text-sm">
                {professorTitlePt}
              </p>
            </div>
          </div>

          {/* Infos */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2 text-[var(--azul-custom)]" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2 text-[var(--azul-custom)]" />
              <span>{formattedTime} • Duração: {appointment.duration}min</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2 text-[var(--azul-custom)]" />
              <span>{appointment.online ? "Online" : appointment.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <DollarSign className="w-5 h-5 mr-2 text-[var(--azul-custom)]" />
              <span>Valor da aula: R$ {appointment.totalValue.toFixed(2)}</span>
            </div>
          </div>

          {/* Material de apoio */}
          <div className="mt-6 border-t pt-4">
            <div className="flex items-center font-semibold text-gray-800 mb-2">
              <FileText className="w-5 h-5 mr-2 text-gray-700" />
              Material de apoio
            </div>
            <ul className="list-disc list-inside text-blue-600 text-sm space-y-1">
              {appointment.materials?.map((mat, idx) => (
                <li key={idx}>
                  <a href={mat.url} className="hover:underline cursor-pointer" target="_blank" rel="noreferrer">
                    {mat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Botões de ação */}
          {appointment.status !== "CANCELLED" && appointment.status !== "COMPLETED" && (
            <div className="mt-6 flex justify-end gap-2 border-t pt-4">
              <button
                onClick={handleCancelClick}
                disabled={loadingAction}
                className={`px-4 py-2 rounded-lg font-semibold transition ${loadingAction ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white cursor-pointer'}`}>
                Cancelar Aula
              </button>
              <button
                onClick={handleCompleteClick}
                disabled={loadingAction}
                className={`px-4 py-2 rounded-lg font-semibold transition ${loadingAction ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'}`}>
                Concluir Aula
              </button>
            </div>
          )}
          {appointment.status === "COMPLETED" && (
            <div className="mt-6 flex justify-end border-t pt-4">
              <button
                disabled
                className="px-4 py-2 rounded-lg font-semibold bg-green-500 text-white cursor-not-allowed"
              >
                Aula Concluída
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de confirmação Cancelamento */}
      <ConfirmationModal
        isOpen={confirmCancelOpen}
        title="Confirmação de Cancelamento"
        message={cancelMessage}
        checkboxLabel="Estou ciente que ao cancelar esta aula, ela não poderá ser marcada como concluída posteriormente."
        confirmLabel="Cancelar Aula"
        confirmColor="red"
        onConfirm={handleConfirmCancel}
        onCancel={() => setConfirmCancelOpen(false)}
      />

      {/* Modal de confirmação Conclusão */}
      <ConfirmationModal
        isOpen={confirmCompleteOpen}
        title="Confirmação de Conclusão"
        message={completeMessage}
        checkboxLabel="Estou certo de que a aula foi realizada com o professor correspondente e desejo marcá-la como concluída."
        confirmLabel="Marcar Como Concluída"
        confirmColor="green"
        onConfirm={handleConfirmComplete}
        onCancel={() => setConfirmCompleteOpen(false)}
      />
    </>
  );
};