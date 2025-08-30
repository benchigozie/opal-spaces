import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import Sort from '../components/Sort';
import Product from "../components/Product";

type ProductType = {
  id: string;
  name: string;
  price: number;
  images: { url: string }[];
  averageRating?: number;
};

function SearchResults() {
  const { dispatch } = useCart();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortOption, setSortOption] = useState<string>("newest");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSearchResults = useCallback(async () => {
    if (!query.trim()) {
      setProducts([]);
      setTotalPages(1);
      return;
    }
    setLoading(true);
    try {
      const res = await api.get(`api/products/search?q=${encodeURIComponent(query)}&page=${page}&limit=20&sort=${sortOption}`);
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  }, [query, page, sortOption]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  useEffect(() => {
    setPage(1);
  }, [query, sortOption]);

  const handleAddToCart = (product: ProductType) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]?.url || "",
        quantity: 1,
      },
    });
  };

  if (!query.trim()) {
    return <p className="text-center mt-6">Enter a search term to see results.</p>;
  }

  return (
    <section className="font-Inter">
      <Sort sortOption={sortOption} setSortOption={setSortOption} />
      <div className="py-8 md:py-12">
        <div className="max-w-[1300px] mx-auto px-4 flex flex-col gap-6">
          <h2 className="text-xl font-semibold">Search Results for "{query}"</h2>

          {loading ? (
            <p>Loading...</p>
          ) : products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-my-white">
              {products.map((product) => (
                <Product
                  key={product.id}
                  images={product.images}
                  name={product.name}
                  price={product.price}
                  averageRating={product.averageRating}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          )}

          {products.length > 0 && (
            <div className="flex justify-center items-center gap-4 mt-6 font-Inter">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-light-wood text-my-white rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span className="text-sm">
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-light-wood text-my-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SearchResults;
