import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import arrow from "../assets/images/arrow.png";
import { useAuth } from "../hooks/useAuth";
import api from "../api/axios";

type ProductImage = {
  id: string;
  url: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  images: ProductImage[];
};

type OrderItem = {
  id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
};

type Order = {
  id: string;
  status: string;
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
};



function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {

        console.log("User in Orders component 2:", user);
      try {
        const response = await api.get(`/api/orders/user/${user?.id}`);
        console.log("Fetched orders data:", response.data);
        if (response.status === 200) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
    console.log("User in Orders component 2:", user);
  }, [user]);

  if (loading) {
    return <p className="text-center py-16">Loading orders...</p>;
  }

  return (
    <section className="text-my-gray pt-4 bg-my-white font-Inter">
      <div className="max-w-[1300px] mx-auto flex flex-col gap-6 py-12 px-4">
        <div>
          <h1 className="text-my-black font-Inria font-bold text-2xl md:text-3xl">
            Your Orders
          </h1>
          <p>Track your past and current orders</p>
        </div>

        {orders.length > 0 ? (
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-my-black font-bold">
                    Order #{order.id.slice(0, 8)}
                  </h3>
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
                    {order.status}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-2 border-gray-300"
                    >
                      <div className="flex items-center gap-3">
                        {item.product.images?.[0] && (
                          <img
                            src={item.product.images[0].url}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div>
                          <p className="font-bold">{item.product.name}</p>
                          <p className="text-sm text-gray-500">
                            {item.quantity} x ₦{item.unitPrice}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold">₦{item.subtotal}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <p>Total</p>
                  <p>₦{order.totalAmount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-my-gray">You have no orders yet.</p>
        )}

        <div className="mt-6">
          <Link
            to="/shop"
            className="rounded-full py-3 hover:bg-gray-200 hover:text-my-gray cursor-pointer bg-light-wood text-my-white w-full flex justify-center items-center gap-4"
          >
            <span>Continue Shopping</span>
            <img src={arrow} className="w-6" alt="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Orders;
