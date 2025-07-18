import Filter from "./Filter"
import Product from "./Product";
import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";
import { animateValue } from "framer-motion";

function Products() {

  const [listOption, setListOption] = useState('All');

  const options = ['All', 'Decor', 'Furniture', 'Lighting'];
  const [ products, setProducts ] =  useState<ProductType[]>([]);

  type ProductType = {
    name: string;
    rating: number;
    price: number;
    image: string;
    averageRating?: number;
    id?: string;
  };

  const fetchProducts = useCallback(async () => {
    try {
      const response = await api.get('api/products/all');
      setProducts(response.data); 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
                  console.log(product);
                  return (<Product image={product.image} name={product.name} price={product.price} averageRating={product.averageRating}/>)
                })
              }
          </div>

        </div>
      </div>
    </section>
  )
}

export default Products;