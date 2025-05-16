import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ModalCatalog from "./ModalCatalog";
import TabBarItem from "./TabBarItem";
import catalogItem from "../assets/catalogIcon.svg";
import iconBasket from "../assets/iconBasket.svg";
import iconProfil from "../assets/iconProfil.svg";
import { useAuth } from "./AuthContext";

type HeaderProps = {
  openCatalog: () => void;
};

const items = [
  { name: "Каталог", image: catalogItem },
  { name: "Корзина", image: iconBasket },
  { name: "Профіль", image: iconProfil },
];

function Header({}: HeaderProps) {
  const catalogButtonRef = useRef<HTMLButtonElement | null>(null);
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [isModalActive, setIsModalActive] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCatalogButtonClick = () => {
    if (catalogButtonRef.current) {
      const rect = catalogButtonRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setIsModalActive(true);
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleBasketClick = () => {
    navigate("/cart"); // Перехід на сторінку корзини
  };

  const basePath = import.meta.env.BASE_URL || "/";

  const goHome = () => {
    navigate("//");
    window.location.reload();
  };

  return (
    <header className="header">
      <span
        className="header__logo"
        onClick={goHome}
        style={{ cursor: "pointer" }}
      >
        glance
      </span>
      <input className="header__search" type="text" placeholder="Пошук" />
      <nav className="header__tabBar">
        {items.map((item, index) => (
          <TabBarItem
            key={index}
            name={item.name}
            image={item.image}
            onClick={
              item.name === "Каталог"
                ? handleCatalogButtonClick
                : item.name === "Профіль"
                ? handleProfileClick
                : item.name === "Корзина"
                ? handleBasketClick // Обробка кліку на корзину
                : undefined
            }
            buttonRef={item.name === "Каталог" ? catalogButtonRef : undefined}
          />
        ))}
      </nav>
      <ModalCatalog
        active={isModalActive}
        setActive={setIsModalActive}
        position={modalPosition}
      />
    </header>
  );
}

export default Header;
