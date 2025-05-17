import { useNavigate } from "react-router-dom";
import { categories } from "./categories"; // імпорт масиву категорій

interface ModalCatalogProps {
  active: boolean;
  setActive: (active: boolean) => void;
  position: { top: number; left: number };
  isMobile?: boolean;
}

const ModalCatalog: React.FC<ModalCatalogProps> = ({
  active,
  setActive,
  position,
  isMobile = false,
}) => {
  const navigate = useNavigate();

  const handleClick = (url: string) => {
    navigate(`/category/${url}`);
    setActive(false);
  };

  return (
    <div
      className={active ? "modalCatalog active" : "modalCatalog"}
      onClick={() => setActive(false)}
    >
      <div
        className={`modalCatalog__content ${
          isMobile ? "modalCatalog__content--mobile" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          top: `${position.top}px`,
          left: isMobile ? "50%" : `${position.left}px`,
          transform: isMobile ? "translateX(-50%)" : "none",
        }}
      >
        <ul className="modalCatalog__list">
          {categories.map((cat, idx) => (
            <li key={idx} onClick={() => handleClick(cat.url)}>
              {cat.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ModalCatalog;
