import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import api from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";
import OrderModal from "../../components/admin/OrderModal";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface Order {
  id: string;
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  totalAmount: number;
  createdAt: string;
  user?: User;
}

function Orders() {

  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [orderModalOpen, setorderModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [orderModalId, setOrderModalId] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { token } = useAuth();

  const fetchOrders = async () => {

      setTimeout(async () => {
      console.log("Fetching orders...");
      try {  
        setLoading(true);
  
        const res = await api.get("/api/orders/all", {
          params: { page, limit: 20, status: statusFilter },
        });
  
        setOrders(res.data.orders || []);
        console.log(res.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }, 1000);
    
  };

  useEffect(() => {
    if (!token) {
      console.warn("No token available, cannot fetch orders.");
      return
    };
    fetchOrders();
  }, [token, page, statusFilter]);

  return (
    <div className="flex flex-col gap-4 text-[15px]">
      <div>
        <h1 className='font-Inria text-2xl text-my-black'>Orders</h1>
        <p>View and manage Orders</p>
      </div>
      <div className="flex flex-col rounded-md bg-my-white p-3 md:p-4 shadow-md">
        <div className="flex flex-col gap-2">
          <div className="pb-2 hover:cursor-pointer">
            <select  onChange={(e) => setStatusFilter(e.target.value)} name="" id="" className="outline-2 outline-gray-200 focus:outline-gray-300 rounded-md p-2">
              <option value="ALL">All</option>
              <option value="PENDING">Pending</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
        <div>
          {loading ? (
            <>
              <Loading className="py-2" />
              <p className="text-center w-full">Loading orders...</p>
            </>
          ) : orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-very-light-wood">
                    <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">Order ID</th>
                    <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">Status</th>
                    <th className="border hidden md:table-cell border-gray-300 px-2 md:px-4 py-2 text-left">Total Amount</th>
                    <th className="border hidden md:table-cell border-gray-300 px-2 md:px-4 py-2 text-left">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-very-light-wood hover:cursor-pointer" onClick={() => {
                      setOrderModalId(order.id);
                      setorderModalOpen(true);
                      }}>
                      <td className="border border-gray-300 px-2 md:px-4 py-2">{order.id}</td>
                      <td className="border border-gray-300 px-2 md:px-4 py-2">{order.status}</td>
                      <td className="border hidden md:table-cell border-gray-300 px-2 md:px-4 py-2">&#8358;{order.totalAmount.toFixed(2)}</td>
                      <td className="border hidden md:table-cell border-gray-300 px-2 md:px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-4">
            {orders.length > 0 && (
              <div className="flex justify-center gap-2 py-2">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-3 py-1 bg-light-wood text-white rounded-md disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="flex items-center">Page {page}</span>
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={orders.length < 20}
                  className="px-3 py-1 bg-light-wood text-white rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {orderModalOpen && <OrderModal id={orderModalId} onClose={() => setorderModalOpen(false)} isSubmitting={true} fetchOrders={fetchOrders}/>}
    </div>
  )
}

export default Orders