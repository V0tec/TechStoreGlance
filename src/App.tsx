import { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Banner from "./components/Banner";
import CatalogMenu from "./components/CatalogMenu";
import Stonks from "./components/Stocks";
import Catalog from "./components/Catalog";
import CategoryPage from "./components/CategoryPage";
import ProductPage from "./components/ProductPage";
import ModalCatalog from "./components/ModalCatalog";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
import CartPage from "./components/CartPage";
import NotFoundPage from "./components/NotFoundPage";
import "swiper/css";
import "swiper/css/navigation";
import SearchPage from "./pages/SearchPage";

function App() {
  const [catalogActive, setCatalogActive] = useState(false);
  const [catalogPosition, setCatalogPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const catalogButtonRef = useRef<HTMLButtonElement | null>(null);

  const openCatalog = () => {
    if (catalogButtonRef.current) {
      const { top, left, height } =
        catalogButtonRef.current.getBoundingClientRect();

      console.log("Catalog button position:", { top, left, height });

      setCatalogPosition({
        top: top + height, // Встановлюємо позицію нижче кнопки
        left: left,
      });
    }
    setCatalogActive(true);
  };

  return (
    <Router basename="/TechStoreGlance">
      <Header openCatalog={openCatalog} />
      <ModalCatalog
        active={catalogActive}
        setActive={setCatalogActive}
        position={catalogPosition}
      />
      <section>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <CatalogMenu />
                <Stonks />
                <Catalog />
              </>
            }
          />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/category/:categoryName/:id" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </section>
    </Router>
  );
}

export default App;
