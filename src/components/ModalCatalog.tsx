import { useNavigate } from "react-router-dom";
import { categories } from "./categories"; // імпорт масиву
// import "./ModalCatalog.css"; // стилі

interface ModalCatalogProps {
  active: boolean;
  setActive: (active: boolean) => void;
  position: { top: number; left: number };
}

const ModalCatalog: React.FC<ModalCatalogProps> = ({
  active,
  setActive,
  position,
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
        className="modalCatalog__content"
        onClick={(e) => e.stopPropagation()}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
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
