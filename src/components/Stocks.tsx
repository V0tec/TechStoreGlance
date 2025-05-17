import React, { useEffect, useState } from "react";
import CatalogCard from "./CatalogCard";
import productsData from "../data/ProductsBase.json"; // Імпортуємо JSON файл

// Тип для товарів
interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  availability: boolean;
  image: string;
  favorite: boolean;
  category: string; // Категорія з JSON (українською/російською)
  currency: string; // Додаємо поле валюти, яке вимагає CatalogCard
}

const Stonks: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Завантажуємо дані з імпортованого JSON
    setProducts(productsData);
  }, []);

  // Фільтрація товарів, що мають знижку більше 0
  const discountedProducts = products.filter(
    (product) => product.discount && product.discount > 0
  );

  return (
    <div>
      <h1>Акції</h1>
      <div className="stocks">
        {discountedProducts.length > 0 ? (
          discountedProducts.map((product) => (
            <CatalogCard key={product.id} {...product} />
          ))
        ) : (
          <p>Немає товарів зі знижками</p>
        )}
      </div>
    </div>
  );
};

export default Stonks;
