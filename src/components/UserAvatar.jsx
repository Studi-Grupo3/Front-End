import React from "react";

import { useEffect, useState } from "react";
import { teacherService } from "../services/teacherService";
import { studentService } from "../services/studentService";

const UserAvatar = ({ name = "", hasNotification = false, isComplete = false, onClick }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    const userRole = (sessionStorage.getItem('userRole') || '').toLowerCase();
    
    if (!userId) {
      setAvatarUrl(null);
      return;
    }

    const userKey = `fotoPerfil_${userId}`;

    // Always fetch from backend to get latest photo (backend is source of truth)
    const fetchFromBackend = async () => {
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
          // Cache in localStorage for offline/faster subsequent loads
          try { localStorage.setItem(userKey, dataUrl); } catch (e) { /* ignore */ }
        } else {
          // No photo on backend, clear any stale cache
          setAvatarUrl(null);
          localStorage.removeItem(userKey);
        }
      } catch (err) {
        // Backend error or no photo - this is expected for users without photo
        // Try localStorage as fallback, then show initials
        const cached = localStorage.getItem(userKey);
        if (cached) {
          setAvatarUrl(cached);
        } else {
          setAvatarUrl(null);
        }
        // Don't log - UserDontHaveProfilePhoto is expected when user hasn't uploaded yet
      }
    };
    fetchFromBackend();

    const handler = (e) => {
      if (e && e.detail && e.detail.url) {
        setAvatarUrl(e.detail.url);
      } else {
        const userId = sessionStorage.getItem('userId');
        if (userId) {
          const userKey = `fotoPerfil_${userId}`;
          const cur = localStorage.getItem(userKey);
          setAvatarUrl(cur);
        }
      }
    };

    window.addEventListener('profile-photo-updated', handler);
    return () => window.removeEventListener('profile-photo-updated', handler);
  }, []);

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
            className={`absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ${
              isComplete ? "bg-green-500" : "bg-yellow-400"
            } animate-ping`}
          ></span>
          {/* Bolinha sólida por cima */}
          <span
            className={`absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ${
              isComplete ? "bg-green-500" : "bg-yellow-400"
            }`}
          ></span>
        </>
      )}
    </div>
  );
};

export default UserAvatar;