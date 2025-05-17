import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalCatalog from "./ModalCatalog";
import TabBarItem from "./TabBarItem";
import { useSearch } from "../hooks/useSearch";
import catalogItem from "../assets/catalogIcon.svg";
import iconBasket from "../assets/iconBasket.svg";
import iconProfil from "../assets/iconProfil.svg";
import { useAuth } from "./AuthContext";

type HeaderProps = {
  openCatalog?: () => void;
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Використовуємо хук useSearch для логіки пошуку
  const {
    searchQuery,
    handleSearchInputChange,
    handleSearchSubmit,
    handleKeyDown,
  } = useSearch();

  useEffect(() => {
    const checkScreenSize = () => {
      const windowWidth = window.innerWidth;
      setIsMobile(windowWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleCatalogButtonClick = () => {
    if (catalogButtonRef.current) {
      const rect = catalogButtonRef.current.getBoundingClientRect();
      // Покращена логіка позиціонування модального вікна,
      // щоб воно було краще вирівняне з кнопкою каталогу
      setModalPosition({
        top: rect.bottom + window.scrollY,
        left: isMobile ? 0 : Math.max(rect.left + window.scrollX - 10, 0),
      });
    }
    setIsModalActive(true);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleBasketClick = () => {
    navigate("/cart");
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const goHome = () => {
    navigate("//");
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header__top">
        <span
          className="header__logo"
          onClick={goHome}
          style={{ cursor: "pointer" }}
        >
          glance
        </span>

        {isMobile && (
          <button
            className="header__burger-button"
            onClick={toggleMobileMenu}
            aria-label="Меню"
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="header__burger-icon-svg"
              width="24"
              height="24"
            >
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </g>
            </svg>
          </button>
        )}
      </div>

      <form onSubmit={handleSearchSubmit} className="header__search-form">
        <input
          className="header__search"
          type="text"
          placeholder="Пошук"
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          className="header__search-button"
          aria-label="Шукати"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="header__search-icon"
          >
            <path
              d="M15.7 14.3L11.5 10.1C12.4 9 13 7.6 13 6C13 2.7 10.3 0 7 0C3.7 0 1 2.7 1 6C1 9.3 3.7 12 7 12C8.6 12 10 11.4 11.1 10.5L15.3 14.7C15.5 14.9 15.8 14.9 16 14.7C16.1 14.5 16.1 14.3 15.7 14.3ZM2 6C2 3.2 4.2 1 7 1C9.8 1 12 3.2 12 6C12 8.8 9.8 11 7 11C4.2 11 2 8.8 2 6Z"
              fill="#767676"
            />
          </svg>
        </button>
      </form>

      {(!isMobile || (isMobile && isMobileMenuOpen)) && (
        <nav
          className={`header__tabBar ${
            isMobile ? "header__tabBar--mobile" : ""
          }`}
        >
          {items.map((item, index) => (
            <TabBarItem
              key={index}
              name={item.name}
              image={isMobile ? undefined : item.image}
              onClick={
                item.name === "Каталог"
                  ? handleCatalogButtonClick
                  : item.name === "Профіль"
                  ? handleProfileClick
                  : item.name === "Корзина"
                  ? handleBasketClick
                  : undefined
              }
              buttonRef={item.name === "Каталог" ? catalogButtonRef : undefined}
              isMobile={isMobile}
            />
          ))}
        </nav>
      )}

      <ModalCatalog
        active={isModalActive}
        setActive={setIsModalActive}
        position={modalPosition}
        isMobile={isMobile}
      />
    </header>
  );
}

export default Header;
