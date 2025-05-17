import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  availability: boolean;
  image: string;
  favorite: boolean;
  category: string; // Категорія з JSON (українською)
  currency: string; // ← Додано: для коректного виводу валюти
}

// Мапа категорій для коректного URL
const categoryMap: { [key: string]: string } = {
  Смартфони: "smartphones",
  Ноутбуки: "laptops",
  "Комп'ютери": "computers",
  Телевізори: "tv",
  Планшети: "tablets",
  Колонки: "speakers",
};

const CatalogCard: React.FC<Product> = ({
  id,
  name,
  price,
  oldPrice,
  discount,
  availability,
  image,
  category,
  currency, // ← Додано
}) => {
  const navigate = useNavigate();
  const categoryUrl = categoryMap[category] || "unknown";

  const handleClick = () => {
    console.log(`Navigating to: /category/${categoryUrl}/${id}`);
    navigate(`/category/${categoryUrl}/${id}`);
  };

  const basePath = import.meta.env.BASE_URL;

  return (
    <div
      className="catalog-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <img src={`${basePath}${image}`} alt={name} />
      {discount !== undefined && discount > 0 && (
        <span className="discount">- {discount}%</span>
      )}

      <h3>{name}</h3>

      <p className="price">
        {price} {currency}
        {oldPrice && oldPrice > price && (
          <>
            {" "}
            <s>
              {oldPrice} {currency}
            </s>{" "}
          </>
        )}
      </p>

      <p className={availability ? "available" : "not-available"}>
        {availability ? "В наявності" : "Немає в наявності"}
      </p>

      <button className="cart-button">В корзину</button>
    </div>
  );
};

export default CatalogCard;
