import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";

// Якщо у тебе є окремий файл з цим типом — імпортуй звідти
interface CartProduct {
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
  quantity: number;
}

function CartPage() {
  const { cart, removeFromCart, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();

  const handleItemClick = (
    itemId: number,
    categoryName: string,
    event: MouseEvent<HTMLDivElement>
  ) => {
    const target = event.target as HTMLElement;

    if (target.tagName === "BUTTON" || target.closest("button")) {
      return;
    }

    navigate(`/category/${categoryName}/${itemId}`);
  };

  return (
    <div className="cart-page">
      <h2>Корзина</h2>
      {cart.length === 0 ? (
        <p>Корзина порожня</p>
      ) : (
        <>
          <div className="cart-items">
            {(cart as CartProduct[]).map((item) => (
              <div
                className="cart-item"
                key={item.id}
                onClick={(event) =>
                  handleItemClick(item.id, item.category, event)
                }
                style={{ cursor: "pointer" }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${item.image.slice(1)}`}
                  alt={item.name}
                />

                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>
                    {item.quantity} × {item.price} грн
                  </p>
                  <p>
                    <strong>{item.quantity * item.price} грн</strong>
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCart(item.id);
                    }}
                  >
                    Видалити
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="summary">
            <p>Усього товарів: {totalItems}</p>
            <p>Загальна сума: {totalPrice} грн</p>
          </div>
          <button className="clear-button" onClick={clearCart}>
            Очистити корзину
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
