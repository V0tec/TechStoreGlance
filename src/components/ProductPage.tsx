import { useParams, Link } from "react-router-dom";
import productsData from "../data/ProductsBase.json";
import { useCart } from "./CartContext"; // Якщо використовуєш корзину

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  currency: string;
  discount: number;
  availability: boolean;
  image: string;
  favorite: boolean;
  oldPrice?: number;
}

interface CartProduct extends Product {
  quantity: number;
}

const ProductPage = () => {
  const { id, categoryName } = useParams();

  const product: Product | undefined = productsData.find(
    (item) => item.id.toString() === id
  );

  if (!product) {
    return <p>Товар не знайдено</p>;
  }

  const discountedPrice = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : product.price;

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const productWithQuantity: CartProduct = {
      ...product,
      quantity: 1,
    };
    addToCart(productWithQuantity);
  };

  return (
    <div className="product-page">
      <nav className="breadcrumbs">
        <Link to="/">Головна</Link> /{" "}
        <Link to={`/category/${categoryName}`}>{categoryName}</Link> /{" "}
        <span>{product.name}</span>
      </nav>

      <h1>{product.name}</h1>
      <img
        src={`${import.meta.env.BASE_URL}${product.image.slice(1)}`}
        alt={product.name}
      />
      <p className="price">
        Ціна: {discountedPrice} {product.currency}
      </p>
      {product.oldPrice && (
        <p className="old-price">
          Стара ціна: {product.oldPrice} {product.currency}
        </p>
      )}
      {product.discount > 0 && (
        <p className="discount">Знижка: {product.discount}%</p>
      )}
      <p
        className={`availability ${
          !product.availability ? "not-available" : ""
        }`}
      >
        {product.availability ? "Є в наявності" : "Немає в наявності"}
      </p>

      <button onClick={handleAddToCart} disabled={!product.availability}>
        Додати до корзини
      </button>

      <Link to={`/category/${categoryName}`}>← Назад до категорії</Link>
    </div>
  );
};

export default ProductPage;
