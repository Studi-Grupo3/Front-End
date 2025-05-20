import React from "react";
import { useNavigate } from "react-router-dom";
import ProfessorCarouselChoose from "../components/ProfessorCarouselChoose";
import NavbarPanel from "../components/NavbarPanel";

export default function YourComponent() {
  const nav = useNavigate();

  return (
    <div className="h-screen overflow-auto sm:overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
        <NavbarPanel />
      </div>
      <div className="pt-12">
        <ProfessorCarouselChoose />
      </div>
    </div>
  );
}
