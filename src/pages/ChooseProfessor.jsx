import React from "react";
import { useNavigate } from "react-router-dom";
import ProfessorCarouselChoose from "../components/ProfessorCarouselChoose";
import NavbarPanel from "../components/NavbarPanel";

export default function YourComponent() {
  const nav = useNavigate();

  return (
    <div>
      <NavbarPanel />
      <ProfessorCarouselChoose />   
    </div>
  );
}
