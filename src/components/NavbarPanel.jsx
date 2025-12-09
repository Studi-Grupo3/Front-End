// src/components/NavbarPanel.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Imagem from "../assets/logo.svg";
import { Plus } from "lucide-react";
import UserAvatar from "./UserAvatar";
import MenuHamburguer from "./MenuHamburguer";
import { ScheduleButton } from "./appointment-manager/ScheduleButton";
import {
  CheckIcon,
  ExclamationCircleIcon,
  EnvelopeIcon,
  UserIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { authService } from "../services/authService";
import React from "react";
import { FiBell } from "react-icons/fi";
import { useUserName } from "../hooks/useUserName";
import { studentService } from "../services/studentService";

function isPersonalInfoComplete(student) {
  if (!student) return false;
  // Adapte os campos conforme sua regra de negócio
  const requiredFields = [
    student.name,
    student.email,
    student.dateBirth,
    student.schoolGrade,
    student.schoolName,
    student.cellphoneNumber,
    student.responsible?.responsibleName,
    student.responsible?.kinship,
    student.responsible?.responsibleCpf,
    student.responsible?.responsibleCellphoneNumber,
  ];
  return requiredFields.every(
    (field) => field && String(field).trim().length > 0
  );
}

const NavbarPanel = ({ role, percentComplete = 0 }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [infoPessoaisCompletas, setInfoPessoaisCompletas] = useState(false);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const userRole = sessionStorage.getItem("userRole");
  // normalize role detection: accept prop `role` or sessionStorage
  const effectiveRole = (role || userRole || "").toLowerCase();
  const isTeacher = effectiveRole.includes("prof") || effectiveRole.includes("teach");
  const { name, loading } = useUserName(userId, userRole);

  useEffect(() => {
    async function getStatus() {
      try {
        if (!isTeacher) {
          const student = await studentService.getById(userId);
          setInfoPessoaisCompletas(isPersonalInfoComplete(student));
        } else {
          // for teachers we don't use the student completeness check
          setInfoPessoaisCompletas(true);
        }
      } catch (err) {
        setInfoPessoaisCompletas(false);
      }
    }
    if (userId) getStatus();
  }, [userId]);

  // Simulação do status de verificação
  const hasPendencias = !infoPessoaisCompletas;

  const handleUserAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      console.log("Logout realizado com sucesso.");

      sessionStorage.clear();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      alert("Erro ao realizar logout. Tente novamente.");
    }
  };

  return (
    <nav className="h-[12vh] w-full bg-[#3970B7] border-b-4 border-b-[#FECB0A] text-white px-4 md:px-10 flex items-center justify-between text-sm relative">
      {/* Navegação Mobile */}
      <div className="md:hidden flex items-center justify-between w-full">
        {/* Links de Navegação (variam conforme role) */}
        <div className="flex justify-center gap-8 w-full max-w-4xl mx-auto">
        </div>
        <MenuHamburguer />
      </div>

      {/* Navegação Desktop */}
      <div className="hidden md:flex items-center justify-evenly w-full">
        {/* Logo */}
        <div className="flex justify-start">
          <img
            src={Imagem}
            className="h-20 cursor-pointer"
            alt="Logo"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Links de Navegação (variam conforme role) */}
        <div className="flex justify-center gap-16">
          {isTeacher ? (
            <>
              <h2
                className="font-semibold text-base cursor-pointer hover:text-yellow-400 transition"
                onClick={() => navigate("/professor/aulas")}
              >
                Início
              </h2>
              <h2
                className="font-semibold text-base cursor-pointer hover:text-yellow-400 transition"
                onClick={() => navigate("/professor/tabela-aula")}
              >
                Aulas
              </h2>
              <h2
                className="font-semibold text-base cursor-pointer hover:text-yellow-400 transition"
                onClick={() => navigate("/professor/historico-aulas")}
              >
                Histórico
              </h2>
              <h2
                className="font-semibold text-base cursor-pointer hover:text-yellow-400 transition"
                onClick={() => navigate("/professor/metricas-aula")}
              >
                Métricas
              </h2>
            </>
          ) : (
            <>
              <h2
                className="font-semibold text-base cursor-pointer hover:text-yellow-400 transition"
                onClick={() => navigate("/aluno/inicio")}
              >
                Painel
              </h2>
              <h2
                className="font-semibold text-base cursor-pointer hover:text-yellow-400 transition"
                onClick={() =>
                  navigate("/agendamentos/gerenciar/proximas-aulas")
                }
              >
                Agendamentos
              </h2>
              <h2
                className="font-semibold text-base cursor-pointer hover:text-yellow-400 transition"
                onClick={() =>
                  navigate("/agendamentos/gerenciar/calendario")
                }
              >
                Calendário
              </h2>
              <h2
                className="font-semibold text-base cursor-pointer hover:text-yellow-400 transition"
                onClick={() => navigate("/aluno/agendamento/criar")}
              >
                Agendar Aula
              </h2>
            </>
          )}
        </div>

        {/* Botão e Avatar */}
        <div className="flex items-center gap-10 flex-shrink-0">
          {/* Mostrar ScheduleButton somente para alunos -> REMOVIDO conforme pedido */}
          {/* {!isTeacher && <ScheduleButton />} */}
          <UserAvatar
            name={loading ? "" : name}
            hasNotification={true}
            isComplete={!hasPendencias}
            onClick={handleUserAvatarClick}
          />
        </div>
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute top-full right-55 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-800"></p>
            <div className="flex justify-between text-xs text-gray-500">
              <strong>Status do perfil</strong>
              <span
                className={
                  hasPendencias ? "text-red-500" : "text-green-600"
                }
              >
                {hasPendencias ? "Incompleto" : "Completo"}
              </span>
            </div>
          </div>

          <ul className="divide-y divide-gray-100">
            {/* Informações Pessoais */}
            <li className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-gray-800">
                  Informações Pessoais
                </span>
              </div>
              {infoPessoaisCompletas ? (
                <CheckIcon className="h-5 w-5 text-green-500" />
              ) : (
                <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />
              )}
            </li>
            {/* Editar Perfil */}
            <li
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
              onClick={() => navigate(isTeacher ? "/professor/completar-cadastro" : "/aluno/completar-cadastro")}
            >
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-gray-700" />
                <span className="text-sm text-gray-800">Editar Perfil</span>
              </div>
            </li>

            {/* Sair */}
            <li
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
              onClick={handleLogout}
            >
              <div className="flex items-center gap-2 text-red-600">
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span className="text-sm font-semibold">Sair da Conta</span>
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavbarPanel;
