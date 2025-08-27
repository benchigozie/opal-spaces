import Filter from "./Filter"
import Product from "./Product";
import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

function Products() {

  const { dispatch } = useCart();

  const [listOption, setListOption] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const options = ['All', 'Decor', 'Furniture', 'Lighting'];
  const [products, setProducts] = useState<ProductType[]>([]);

  type ProductType = {
    name: string;
    rating: number;
    price: number;
    images: { url: string }[];
    averageRating?: number;
    id?: string;
  };

  const fetchProducts = useCallback(async () => {
    try {
      const response = await api.get(`api/products/all?page=${page}&limit=20`);
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddToCart = (product: ProductType) => {
    console.log('This is the product', product);
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id!,
        name: product.name,
        price: product.price,
        image: product.images[0]?.url || "",
        quantity: 1
      }
    });
  };

  return (
    <section>
      <Filter />
      <div className="py-8 md:py-12">
        <div className="max-w-[1300px] mx-auto px-4 flex flex-col gap-6">
          <div className="">
            <div className="grid grid-cols-[100px_100px] md:grid-cols-[100px_100px_100px_100px] gap-2 max-w-[400px]">
              {options.map((option) => (
                <label
                  key={option}
                  className={`cursor-pointer px-4 py-2 rounded-full border text-center
            ${listOption === option ? 'bg-light-wood text-my-white border-light-wood' : 'bg-my-white text-light-wood border-light-wood'}
          `}
                >
                  <input
                    type="radio"
                    name="filter"
                    value={option}
                    checked={listOption === option}
                    onChange={() => setListOption(option)}
                    className="hidden"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-my-white">
            {
              products.map((product) => {
                console.log('This is product image', product.images);
                return (<Product key={product.id} images={product.images} name={product.name} price={product.price} averageRating={product.averageRating} onAddToCart={() => handleAddToCart(product)} />)
              })
            }
          </div>
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

        </div>
      </div>
    </section>
  )
}

export default Products;