import React from "react";

import { useEffect, useState } from "react";
import { teacherService } from "../services/teacherService";
import { studentService } from "../services/studentService";

const MOCK_PROFILES = {
  // Teachers
  "Prof. Carlos Lima": "/images/professors/carlos-lima.png",
  "Prof. Beatriz Costa": "/images/professors/beatriz-costa.png",
  "Prof. Fernanda Alvez": "/images/professors/fernanda-alvez.png",
  "Prof. Rodrigo Santos": "/images/professors/rodrigo-santos.png",
  "Prof. Marina Oliveira": "/images/professors/marina-oliveira.png",
  "Prof. Gustavo Pereira": "/images/professors/gustavo-pereira.png",
  "Prof. Helena Moura": "/images/professors/helena-moura.png",
  "Prof. João Neto": "/images/professors/joao-neto.png",
  "Prof. Carla Mendes": "/images/professors/carla-mendes.png",
  "Prof. Marcos Vinicius": "/images/professors/marcos-vinicius.png",
  // Students
  "Matheus Alves": "/images/students/matheus-alves.png",
  "Ana Beatriz Silva": "/images/students/ana-beatriz-silva.png",
  "Lucas Ferreira": "/images/students/lucas-ferreira.png",
  "Mariana Costa": "/images/students/mariana-costa.png",
  "Gabriel Rocha": "/images/students/gabriel-rocha.png",
  "Isabela Martins": "/images/students/isabela-martins.png",
  "Rafael Gomes": "/images/students/rafael-gomes.png",
  "Larissa Pereira": "/images/students/larissa-pereira.png",
  "Pedro Albuquerque": "/images/students/pedro-albuquerque.png",
  "Beatriz Ramos": "/images/students/beatriz-ramos.png"
};

const UserAvatar = ({ name = "", hasNotification = false, isComplete = false, onClick }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    // Helper to get consistent storage key
    const getStorageKey = (uid) => `profile_photo_${uid}`;

    const userId = sessionStorage.getItem('userId');
    const userRole = (sessionStorage.getItem('userRole') || '').toLowerCase();

    // 1. Tente carregar do localStorage (específico do usuário)
    let initialAvatar = null;
    if (userId) {
      const stored = localStorage.getItem(getStorageKey(userId));
      if (stored) {
        initialAvatar = stored;
      }
    }

    // 2. Se não tiver no storage, usa o Mock se existir
    if (!initialAvatar && name && MOCK_PROFILES[name]) {
      initialAvatar = MOCK_PROFILES[name];
    }

    // Configura estado inicial
    setAvatarUrl(initialAvatar);

    // 3. Busca atualizada do servidor (se não tiver no storage, ou para garantir)
    // Se já tiver no storage, evitamos a chamada network para performance? 
    // O usuário pediu "persistir", então se tá no storage confiamos.
    // Mas se for Mock (initialAvatar == path do mock), TENTAMOS buscar do server para ver se o usuário fez upload de override.

    const isMock = initialAvatar && initialAvatar.startsWith('/');
    const shouldFetch = userId && (!initialAvatar || isMock);

    const tryFetch = async () => {
      if (!shouldFetch) return;

      try {
        let blob = null;
        if (userRole.includes('teach') || userRole.includes('prof')) {
          blob = await teacherService.getProfilePhoto(userId);
        } else {
          blob = await studentService.getProfilePhoto(userId);
        }

        if (blob) {
          const dataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });

          setAvatarUrl(dataUrl);
          // Salva no storage com chave única do usuário
          try { localStorage.setItem(getStorageKey(userId), dataUrl); } catch (e) { /* ignore */ }
        }
      } catch (err) {
        // Se der erro (ex: 404 sem foto), mantemos o que está no estado (Mock ou null)
        // console.debug('no profile photo or error', err);
      }
    };

    tryFetch();

    const handler = (e) => {
      if (e && e.detail && e.detail.url) {
        setAvatarUrl(e.detail.url);
        // Atualiza storage também ao receber evento
        if (userId) {
          try { localStorage.setItem(getStorageKey(userId), e.detail.url); } catch (e) { }
        }
      }
    };

    window.addEventListener('profile-photo-updated', handler);
    return () => window.removeEventListener('profile-photo-updated', handler);
  }, [name]);

  // Função para pegar as iniciais do nome
  function getInitials(name) {
    if (!name) return "";
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(word => word[0].toUpperCase())
      .join("");
  }

  const initials = getInitials(name);

  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      {/* Avatar: show image when available, otherwise initials */}
      {avatarUrl ? (
        <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-500">
          <img src={avatarUrl} alt="avatar" className="object-cover w-full h-full" />
        </div>
      ) : (
        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm border border-gray-500">
          {initials}
        </div>
      )}

      {/* Notificação */}
      {hasNotification && (
        <>
          {/* Bolinha com animação ping */}
          <span
            className={`absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ${isComplete ? "bg-green-500" : "bg-yellow-400"
              } animate-ping`}
          ></span>
          {/* Bolinha sólida por cima */}
          <span
            className={`absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ${isComplete ? "bg-green-500" : "bg-yellow-400"
              }`}
          ></span>
        </>
      )}
    </div>
  );
};

export default UserAvatar;