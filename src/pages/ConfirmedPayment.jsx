import React from "react";
import NavbarPanel from "../components/NavbarPanel";
import { useNavigate } from "react-router-dom";

const AgendamentoConcluido = () => {
  const nav = useNavigate();

  return (
    <>
      <NavbarPanel />
      <div className="min-h-[calc(100vh-4rem)] flex items-start justify-center bg-gray-50 pt-8">
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-10 w-full max-w-2xl text-center">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Agendamento Concluído!</h2>
          <p className="text-base text-gray-600 mb-8">
            Sua aula foi agendada com sucesso. Abaixo estão os detalhes do seu agendamento.
          </p>
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
            <dl className="divide-y divide-gray-200 text-base text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 bg-gray-50 px-6 py-4">
                <dt className="font-semibold text-gray-700">Matéria</dt>
                <dd className="text-gray-900 sm:mt-0 mt-1">Ciências</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 px-6 py-4">
                <dt className="font-semibold text-gray-700">Tipo de Aula</dt>
                <dd className="text-gray-900 sm:mt-0 mt-1">Domicílio</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 bg-gray-50 px-6 py-4">
                <dt className="font-semibold text-gray-700">Duração da aula</dt>
                <dd className="text-gray-900 sm:mt-0 mt-1">1h30min</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 px-6 py-4">
                <dt className="font-semibold text-gray-700">Professor</dt>
                <dd className="text-gray-900 sm:mt-0 mt-1">A ser definido</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 bg-gray-50 px-6 py-4">
                <dt className="font-semibold text-gray-700">Data</dt>
                <dd className="text-gray-900 sm:mt-0 mt-1">sexta-feira, 28 de março de 2025</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 px-6 py-4">
                <dt className="font-semibold text-gray-700">Horário</dt>
                <dd className="text-gray-900 sm:mt-0 mt-1">11:00</dd>
              </div>
            </dl>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => nav("/Class-Details")}
              className="px-6 py-3 text-base bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
            >
              Agendar Nova Aula
            </button>

            <button
              onClick={() => nav("/meus-agendamentos")}
              className="px-6 py-3 text-base bg-blue-600 rounded-lg text-white hover:bg-blue-700"
            >
              Ver Meus Agendamentos
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgendamentoConcluido;