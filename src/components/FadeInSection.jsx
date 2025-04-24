import { useState, useEffect } from "react";

// Componente que aplica a animação quando o elemento entra na tela
const FadeInSection = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } // O elemento será considerado visível quando 50% dele aparecer na tela
    );

    const element = document.getElementById(children.key); // Usando o ID para identificar o elemento
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [children]);

  return (
    <div
      id={children.key}
      className={`transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};