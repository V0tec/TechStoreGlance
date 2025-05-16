import { useParams, Link } from "react-router-dom";
import productsData from "../data/ProductsBase.json";
import CatalogCard from "./CatalogCard";

const categoryMap = {
  smartphones: "Смартфони",
  laptops: "Ноутбуки",
  computers: "Комп'ютери",
  tv: "Телевізори",
  tablets: "Планшети",
  speakers: "Колонки",
} as const; // Додаємо `as const` для строгої типізації

function CategoryPage() {
  const { categoryName } = useParams();

  // Приводимо categoryName до ключа categoryMap
  const categoryTitle = categoryMap[categoryName as keyof typeof categoryMap] || "Невідома категорія";

  // Фільтруємо товари за категорією
  const filteredProducts = productsData.filter(product => product.category === categoryTitle);

  return (
    <div>
      {/* Хлібні крихти */}
      <nav className="breadcrumbs">
        <Link to="/">Головна</Link> / <span>{categoryTitle}</span>
      </nav>

      {/* Назва категорії */}
      <h2>Категорія: {categoryTitle}</h2>

      {/* Відображення товарів */}
      <div className="catalog-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <CatalogCard key={product.id} {...product} />)
        ) : (
          <p>Немає товарів у цій категорії.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
