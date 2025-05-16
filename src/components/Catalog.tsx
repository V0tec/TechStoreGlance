import React from "react";
import { useParams } from "react-router-dom";
import productsData from "../data/ProductsBase.json";
import CatalogCard from "./CatalogCard";

const Catalog: React.FC = () => {
  const { categoryName } = useParams(); // Отримуємо категорію з URL

  // Якщо немає категорії (ми на головній) → не показуємо товари
  if (!categoryName) {
    return null;
  }

  // Фільтруємо товари за категорією
  const filteredProducts = productsData.filter((product) => product.category === categoryName);

  return (
    <section className="catalog">
      <h1>Категорія: {categoryName}</h1>
      <div className="catalog-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <CatalogCard key={product.id} {...product} />)
        ) : (
          <p>Немає товарів у цій категорії.</p>
        )}
      </div>
    </section>
  );
};

export default Catalog;
