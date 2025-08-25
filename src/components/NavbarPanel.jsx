// src/components/NavbarPanel.jsx
import { useState } from "react";
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

const NavbarPanel = ({ role }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const userRole = sessionStorage.getItem("userRole");
  const { name, loading } = useUserName(userId, userRole);

  // Simulação do status de verificação
  const emailVerificado = true;
  const infoPessoaisCompletas = true;
  const documentosCompletos = true;
  const hasPendencias =
    !emailVerificado || !infoPessoaisCompletas || !documentosCompletos;

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
        <div className="flex-1 flex justify-center pl-10">
          <img src={Imagem} className="h-20" alt="Logo" />
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

        {/* Links de Navegação */}
        <div className="flex flex-row gap-16 pl-24 justify-center">
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
        </div>

        {/* Botão e Avatar */}
        <div className="flex items-center gap-10">
          <ScheduleButton />
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
              <span className={hasPendencias ? "text-red-500" : "text-green-600"}>
                {hasPendencias ? "Incompleto" : "Completo"}
              </span>
            </div>
          </div>

          <ul className="divide-y divide-gray-100">
            {/* Email Verificado */}
            <li className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-gray-800">Email Verificado</span>
              </div>
              {emailVerificado ? (
                <CheckIcon className="h-5 w-5 text-green-500" />
              ) : (
                <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />
              )}
            </li>

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

            {/* Documentos */}
            <li className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-gray-800">Documentos</span>
              </div>
              {documentosCompletos ? (
                <CheckIcon className="h-5 w-5 text-green-500" />
              ) : (
                <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />
              )}
            </li>

            {/* Editar Perfil */}
            <li className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer transition">
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
