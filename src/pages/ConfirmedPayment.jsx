import React from "react";
import NavbarPanel from "../components/NavbarPanel";
import { useNavigate } from "react-router-dom";

const AgendamentoConcluido = () => {
  const nav = useNavigate();

  return (
    // Container que ocupa a altura mínima da tela e organiza Navbar + conteúdo
    <div className="flex flex-col min-h-screen">
      {/* Navbar no topo */}
      <NavbarPanel />
      {/* 
        Main ocupa todo o espaço restante após a Navbar.
        bg-[#f8f8f8] preenche o fundo cinza; 
        pt-8 e pb-8 para espaçamento vertical do conteúdo; 
        border-t-4 com cor personalizada para a borda superior amarela. 
      */}
      <main className="flex-1 flex items-start justify-center bg-[#f8f8f8] pt-8 pb-8">
        {/* Card centralizado horizontalmente e alinhado verticalmente conforme items-start */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 w-full max-w-lg text-center">
          {/* Ícone de check */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="w-7 h-7 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Título e descrição */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Agendamento Concluído!</h2>
          <p className="text-sm text-gray-600 mb-6">
            Sua aula foi agendada com sucesso. Abaixo estão os detalhes do seu agendamento.
          </p>

          {/* Detalhes em <dl> */}
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
            <dl className="divide-y divide-gray-200 text-sm text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 bg-gray-50 px-4 py-2">
                <dt className="font-semibold text-gray-700">Matéria</dt>
                <dd className="text-gray-900 mt-1 sm:mt-0">Ciências</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 px-4 py-2">
                <dt className="font-semibold text-gray-700">Tipo de Aula</dt>
                <dd className="text-gray-900 mt-1 sm:mt-0">Domicílio</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 bg-gray-50 px-4 py-2">
                <dt className="font-semibold text-gray-700">Duração da aula</dt>
                <dd className="text-gray-900 mt-1 sm:mt-0">1h30min</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 px-4 py-2">
                <dt className="font-semibold text-gray-700">Professor</dt>
                <dd className="text-gray-900 mt-1 sm:mt-0">A ser definido</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 bg-gray-50 px-4 py-2">
                <dt className="font-semibold text-gray-700">Data</dt>
                <dd className="text-gray-900 mt-1 sm:mt-0">sexta-feira, 28 de março de 2025</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 px-4 py-2">
                <dt className="font-semibold text-gray-700">Horário</dt>
                <dd className="text-gray-900 mt-1 sm:mt-0">11:00</dd>
              </div>
            </dl>
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => nav("/Class-Details")}
              className="px-6 py-2 text-sm bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition"
            >
              Agendar Nova Aula
            </button>

            <button
              onClick={() => nav("/meus-agendamentos")}
              className="px-6 py-2 text-sm bg-[#3970B7] rounded-lg text-white hover:bg-[#2e5a94] transition"
            >
              Ver Meus Agendamentos
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AgendamentoConcluido;
