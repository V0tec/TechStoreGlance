import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/"); // або твій базовий шлях
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404</h1>
      <h2>Сторінка не знайдена</h2>
      <p>На жаль, такої сторінки не існує.</p>
      <button
        onClick={goHome}
        style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}
      >
        На головну
      </button>
    </div>
  );
};

export default NotFoundPage;
