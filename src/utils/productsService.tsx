// src/utils/productsService.tsx
import { useEffect, useState } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  availability: boolean;
  image: string;
  favorite: boolean;
  category: string;
  currency: string;
}

// Define the fallback products array to use when fetch fails
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Default Product",
    price: 99.99,
    availability: true,
    image: "/placeholder.jpg",
    favorite: false,
    category: "Default",
    currency: "USD",
  },
  {
    id: 2,
    name: "Backup Product",
    price: 49.99,
    oldPrice: 79.99,
    discount: 38,
    availability: true,
    image: "/placeholder.jpg",
    favorite: false,
    category: "Default",
    currency: "USD",
  },
];

// Function to search products with better error handling
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    console.log("Searching for:", query);

    // Try to fetch from multiple possible locations
    const possiblePaths = [
      "/src/data/ProductsBase.json",
      "./src/data/ProductsBase.json",
      "/data/ProductsBase.json",
      "./data/ProductsBase.json",
      "/ProductsBase.json",
      "./ProductsBase.json",
    ];

    let allProducts: Product[] = [];
    let fetchSuccess = false;

    // Try each path until we find the data
    for (const path of possiblePaths) {
      try {
        console.log(`Trying to fetch from: ${path}`);
        const response = await fetch(path);
        if (response.ok) {
          allProducts = await response.json();
          console.log(
            `Successfully loaded ${allProducts.length} products from ${path}`
          );
          fetchSuccess = true;
          break;
        }
      } catch (err) {
        console.log(`Failed to fetch from ${path}:`, err);
      }
    }

    // If all fetch attempts failed, use fallback data
    if (!fetchSuccess) {
      console.log("All fetch attempts failed, using fallback data");
      allProducts = FALLBACK_PRODUCTS;
    }

    // If query is empty, return all products
    if (!query || !query.trim()) {
      return allProducts;
    }

    // Filter products based on search query (case insensitive)
    const normalizedQuery = query.toLowerCase();
    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery)
    );
  } catch (error) {
    console.error("Error searching products:", error);
    // Return fallback data in case of error
    return FALLBACK_PRODUCTS;
  }
}

// Hook for getting products data
export function useProducts(query?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError("");
        const fetchedProducts = await searchProducts(query || "");
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Не вдалося завантажити товари. Спробуйте пізніше.");
        // Use fallback data even on error
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return { products, isLoading, error };
}
