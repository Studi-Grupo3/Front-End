import React from "react";
import { useNavigate } from "react-router-dom";
import ProfessorCarouselChoose from "../components/ProfessorCarouselChoose";

export default function YourComponent() {
  const nav = useNavigate();

  return (
    <ProfessorCarouselChoose />
  );
}
