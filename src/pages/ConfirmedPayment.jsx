import React, { useEffect, useState } from "react";
import NavbarPanel from "../components/NavbarPanel";
import { useNavigate, useParams } from "react-router-dom";
import { appointmentService } from "../services/appointmentService";
import { translateSubject  } from "../utils/tradutionUtils";

const ConfirmedPayment = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const data = await appointmentService.getById(appointmentId);
        setAppointment(data);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os detalhes.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [appointmentId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center mt-20 text-red-600">
        <p>{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-200 rounded"
        >
          Voltar
        </button>
      </div>
    );
  }

  const { location, lessonDuration, dateTime, teacher } = appointment;
  const subject     = teacher?.subject     || '';
  const teacherName = teacher?.name        || '';

  const dateObj = new Date(dateTime);
  const dateFormatted = dateObj.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
  const timeFormatted = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarPanel />
      <main className="flex-1 flex items-start justify-center bg-[#f8f8f8] pt-8 pb-8">
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 w-full max-w-lg text-center">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Agendamento Concluído!</h2>
          <p className="text-sm text-gray-600 mb-6">
            Sua aula foi agendada com sucesso. Abaixo estão os detalhes do seu agendamento.
          </p>
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
            <dl className="divide-y divide-gray-200 text-sm text-left">
              <InfoRow label="Matéria" value={translateSubject(subject)} striped />
              <InfoRow label="Local" value={location} />
              <InfoRow label="Duração" value={`${Math.floor(lessonDuration/60)}h${lessonDuration%60}min`} striped />
              <InfoRow label="Professor" value={teacherName || 'A ser definido'} />
              <InfoRow label="Data" value={dateFormatted} striped />
              <InfoRow label="Horário" value={timeFormatted} />
            </dl>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/aluno/agendamento/criar")}
              className="px-6 py-2 text-sm bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition cursor-pointer"
            >
              Agendar Nova Aula
            </button>
            <button
              onClick={() => navigate("/agendamentos/gerenciar/proximas-aulas")}
              className="px-6 py-2 text-sm bg-[#3970B7] rounded-lg text-white hover:bg-[#2e5a94] transition cursor-pointer"
            >
              Ver Meus Agendamentos
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

function InfoRow({ label, value, striped = false }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 px-4 py-2 ${striped ? 'bg-gray-50' : ''}`}>
      <dt className="font-semibold text-gray-700">{label}</dt>
      <dd className="text-gray-900 mt-1 sm:mt-0">{value}</dd>
    </div>
  );
}

export default ConfirmedPayment;
