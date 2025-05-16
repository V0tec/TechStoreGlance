import { useNavigate } from "react-router-dom";
import CatalogMenuCard from "./CatalogMenuCards";
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
    <>
      <h1>Каталог</h1>
      <nav className="catalogMenu">
        {categories.map((category, index) => (
          <div key={index} onClick={() => handleCategoryClick(category.url)} >
            <CatalogMenuCard name={category.name} image={category.image} />
          </div>
        ))}
      </nav>
    </>
  );
}

export default CatalogMenu;
