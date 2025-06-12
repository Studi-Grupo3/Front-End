import React from "react";
import { useNavigate } from "react-router-dom";
import ProfessorCarouselChoose from "../components/ProfessorCarouselChoose";
import NavbarPanel from "../components/NavbarPanel";

export default function ChooseProfessor() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <NavbarPanel />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        <ProfessorCarouselChoose />
      </div>
    </div>
  );
}