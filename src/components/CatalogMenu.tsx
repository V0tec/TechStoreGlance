import { useNavigate } from "react-router-dom";
import CatalogMenuCard from "./CatalogMenuCards";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import smartphoneImage from "../assets/catalog/Smartphone.png";
import laptopImage from "../assets/catalog/Laptop.png";
import computerImage from "../assets/catalog/Computer.png";
import tvImage from "../assets/catalog/TV.png";
import tabletImage from "../assets/catalog/Tablet.png";
import columnImage from "../assets/catalog/Column.png";

function CatalogMenu() {
  const navigate = useNavigate();

  const categories = [
    { name: "Смартфони", image: smartphoneImage, url: "smartphones" },
    { name: "Ноутбуки", image: laptopImage, url: "laptops" },
    { name: "Комп'ютери", image: computerImage, url: "computers" },
    { name: "Телевізори", image: tvImage, url: "tv" },
    { name: "Планшети", image: tabletImage, url: "tablets" },
    { name: "Колонки", image: columnImage, url: "speakers" },
  ];

  const handleCategoryClick = (url: string) => {
    navigate(`/category/${url}`);
  };

  return (
    <div className="catalog-section">
      <h1>Каталог</h1>
      <div className="catalog-container">
        <nav className="catalogMenu">
          <Swiper
            modules={[Navigation, FreeMode]}
            slidesPerView="auto"
            spaceBetween={16}
            navigation
            freeMode={true}
            className="catalogMenu__slider"
            breakpoints={{
              320: {
                spaceBetween: 10,
              },
              480: {
                spaceBetween: 12,
              },
              768: {
                spaceBetween: 16,
              },
            }}
          >
            {categories.map((category, index) => (
              <SwiperSlide
                key={index}
                className="catalogMenu__slide"
                style={{ width: "auto" }}
              >
                <div
                  className="catalogMenu__card"
                  onClick={() => handleCategoryClick(category.url)}
                >
                  <CatalogMenuCard
                    name={category.name}
                    image={category.image}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </nav>
      </div>
    </div>
  );
}

export default CatalogMenu;
