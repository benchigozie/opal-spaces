import plusImage from '../../assets/images/plus.png';
import searchImage from '../../assets/images/search.png';
import api from "../../api/axios";
import { useCallback, useState } from "react";

type ProductType = {
  name: string;
  rating: number;
  price: number;
  image: string;
  averageRating?: number;
  id?: string;
};

function Products() {
  
  const [products, setProducts] = useState<ProductType[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await api.get('api/products/all');
      setProducts(response.data); 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className='font-Inria text-2xl text-my-black'>Products</h1>
        <p>Manage your product inventory.</p>
      </div>
      <div className="flex flex-col rounded-md bg-my-white p-4 shadow-md">
        <div className="flex items-center justify-between border-b-1 border-gray-200 pb-4">
          <div className="rounded-md outline-1 outline-light-wood py-2 px-4 flex items-center gap-3">
            <button className="cursor-pointer">
              <img src={searchImage} alt="" className="w-4" />
            </button>
            <input type="text" className="text-my-gray" placeholder="search for a product" />
          </div>
          <div className="text-my-white bg-light-wood flex w-48 items-center justify-between px-4 py-2 rounded-lg hover:scale-105 cursor-pointer transition-transform duration-300">
            <img src={plusImage} alt="" className="w-4 h-4" />
            <button className="" >Add New Product</button>
          </div>
        </div>
        <div className="pt-4">

        </div>
      </div>
    </div>

  )
}

export default Products