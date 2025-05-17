import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./scss/style.scss";
import App from "./App";
import { AuthProvider } from "./components/AuthContext";
import { CartProvider } from "./components/CartContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
