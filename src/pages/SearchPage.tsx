import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CatalogCard from "../components/CatalogCard";
import { useProducts } from "../utils/productsService";

function SearchPage() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Extract search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    if (query) {
      setSearchQuery(query);
    } else {
      // If there's no query in URL, we don't need to redirect
      // as this would cause an infinite loop
      console.log("No search query found in URL");
    }
  }, [location.search]);

  // Use the hook to get search results
  const {
    products: searchResults,
    isLoading,
    error,
  } = useProducts(searchQuery);

  console.log("Search results:", searchResults); // Debugging log

  return (
    <div className="search-page">
      <h1 className="search-page__title">
        Результати пошуку для "{searchQuery}"
      </h1>

      {isLoading ? (
        <div className="search-page__loading">
          <p>Шукаємо товари...</p>
        </div>
      ) : error ? (
        <div className="search-page__error">
          <p>{error}</p>
        </div>
      ) : searchResults && searchResults.length === 0 ? (
        <div className="search-page__empty">
          <p>Нічого не знайдено за запитом "{searchQuery}"</p>
          <p>
            Спробуйте змінити пошуковий запит або перегляньте наші категорії
            товарів.
          </p>
        </div>
      ) : (
        <div className="search-page__results">
          {searchResults &&
            searchResults.map((product) => (
              <CatalogCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                discount={product.discount}
                availability={product.availability}
                image={product.image}
                favorite={product.favorite}
                category={product.category}
                currency={product.currency}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
