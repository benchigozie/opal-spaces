import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { normalizeProduct } from '../../utils/normalizeProductImages';
import { DollarSign, ShoppingCart, AlertTriangle, Package, TrendingUp } from "lucide-react";

/*type AnalyticsSummary = {
  totalSales: number;
  pendingOrders: number;
  lowStockItems: number;
  totalProductsSold: number;
  salesGrowth: number;
  productsGrowth: number;
};*/

type ProductType = {
  name: string;
  rating?: number;
  price: number;
  images: string[];
  stock: number;
  description: string;
  category?: { id: string; name: string };
  averageRating?: number;
  id?: string;
};

function Dashboard() {

  const [products, setProducts] = useState<ProductType[]>([]);
 // const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);

  const { user } = useAuth();

  const fetchProducts = async () => {
    try {
      const response = await api.get('api/products/all');

      const normalizedProducts = normalizeProduct(response.data.products);
      normalizedProducts.splice(5);

      setProducts(normalizedProducts);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      //const response = await api.get('api/analytics/summary');
      //setAnalytics(response.data); // i will still use dummy values to make my demo easier.

    } catch (error) {
      
      console.error("Error fetching analytics:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchAnalytics();
  }, []);

  return (
    <div>
      <div>
        <h1 className='font-Inria text-2xl text-my-black'>DashBoard</h1>
        <p>Welcome back {user?.firstName}.</p>
      </div>
      <div>
        <div className='grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 mt-4 text-[14px]'>
          <div className="flex justify-between rounded-md bg-my-white p-4 md:p-6 shadow-md">
            <div className='flex flex-col gap-1'>
              <p>Total Sales</p>
              <p className='text-my-black font-Inria text-2xl'>&#8358;2,750,600</p>
              <p><span className='flex items-center gap-1'><TrendingUp size={14} className='text-green-600'/>10%</span> vs last month</p>
            </div>
            <div>
              <div className='p-2 bg-very-light-wood rounded-full inline-block'>
                <DollarSign size={22} className="text-light-wood" />
              </div>
            </div>
          </div>
          <div className="flex justify-between rounded-md bg-my-white p-4 md:p-6 shadow-md">
            <div className='flex flex-col gap-1'>
              <p>Pending Orders</p>
              <p className='text-my-black font-Inria text-2xl'>14</p>
            </div>
            <div>
              <div className='p-2 bg-very-light-wood rounded-full inline-block'>
                <ShoppingCart size={22} className="text-light-wood" />
              </div>
            </div>
          </div>
          <div className="flex justify-between rounded-md bg-my-white p-4 md:p-6 shadow-md">
            <div className='flex flex-col gap-1'>
              <p>Low Stock Items</p>
              <p className='text-my-black font-Inria text-2xl'>8</p>
            </div>
            <div>
              <div className='p-2 bg-very-light-wood rounded-full inline-block'>
                <AlertTriangle size={22} className="text-light-wood" />
              </div>
            </div>
          </div>
          <div className="flex justify-between rounded-md bg-my-white p-4 md:p-6 shadow-md">
            <div className='flex flex-col gap-1'>
              <p>Total Products Sold</p>
              <p className='text-my-black font-Inria text-2xl'>134</p>
              <p><span className='flex gap-1 items-center'><TrendingUp size={14} className='text-green-600'/>10%</span> vs last month</p>
            </div>
            <div>
              <div className='p-2 bg-very-light-wood rounded-full inline-block'>
                <Package size={22} className="text-light-wood" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-md bg-my-white p-3 md:p-4 shadow-md mt-8">
          <h2 className='font-Inria text-xl text-my-black mb-4'>Recent Products</h2>
          <div className="flex flex-col gap-4">
            <table>
              <thead>
                <tr className='text-[13px] md:text-[15px]'>
                  <th className='p-1 md:p-3 text-left'>Image</th>
                  <th className='p-1 md:p-3 text-left'>Name</th>
                  <th className='p-1 md:p-3 text-left hidden lg:table-cell'>Price</th>
                  <th className='p-1 md:p-3 text-left hidden lg:table-cell'>Stock</th>
                  <th className='p-1 md:p-3 text-left hidden md:table-cell'>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.map((product) => {

                    return (
                      <tr key={product.id} className="border-t-1 border-gray-300 text-[15px]">
                        <td className="px-1 md:px-3 py-2 md:py-4 gap-3 align-middle">
                          {product.images[0] ? (
                            <img
                              src={product.images[0]}
                              alt=''
                              className="w-10 h-10 object-cover rounded"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                              <span className="text-gray-500 text-[10px]">No Image</span>
                            </div>
                          )
                          }
                        </td>
                        <td className="px-1 md:px-3 py-2 md:py-4 gap-3 align-middle">
                          <span>{product.name}</span>
                        </td>
                        <td className="px-1 md:px-3 py-2 md:py-4 align-middle hidden lg:table-cell">&#8358;{product.price.toFixed(2)}</td>
                        <td className="px-1 md:px-3 py-2 md:py-4 align-middle hidden lg:table-cell">{product.stock}</td>
                        <td className="px-1 md:px-3 py-2 md:py-4 align-middle hidden md:table-cell">
                          {product.stock > 0 ? (
                            <span className="text-green-400 font-medium">In Stock</span>
                          ) : (
                            <span className="text-red-500 font-medium">Out of Stock</span>
                          )}
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Dashboard