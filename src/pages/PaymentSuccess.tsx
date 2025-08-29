import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../context/CartContext";
import api from "../api/axios";

type OrderItem = {
    id: string;
    quantity: number;
    subtotal: number;
    unitPrice: number;
    product: { name: string };
  };
  
  type OrderType = {
    id: string;
    totalAmount: number;
    items: OrderItem[];
  };

export default function PaymentSuccess() {

    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState<OrderType | null>(null);
    const [params] = useSearchParams();
    const { user } = useAuth();
    const { state } = useCart();
    console.log(params);
    const ref = params.get("reference");

    useEffect(() => {
        if (!ref) return;

        const verifyPayment = async () => {
            console.log("this is state items:", state.items);
            try {
                setLoading(true);
                const res = await api.post("/api/orders/verify", {
                    reference: ref,
                    userId: user?.id,
                    cartItems: state.items,
                });

                if (res.data.success) {
                    setOrder(res.data.order);
                }
            } catch (err) {
                console.error("Error verifying payment:", err);
                setOrder(null);
            } finally {
                setLoading(false);
            }
        };

        verifyPayment();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-24 font-Inter text-my-gray">
                <p>Verifying payment...</p>
            </div>
        );
    }

    return (
        <div className="justify-center py-24 font-Inter flex flex-col items-center">
            <div className="max-w-[500px] flex flex-col items-center gap-2">
                <CheckCircle className="w-20 h-20 text-green-600 mb-4" />
                <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
                <p>Your reference: {ref}</p>
                <p className="text-gray-600 mt-2">Thank you for your purchase. Your order has been placed.</p>
                <Link
                    to="/shop"
                    className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    Continue Shopping
                </Link>
            </div>
            {order && (
                <div className="w-full max-w-[700px] mt-4">
                    <h2 className="font-semibold mb-2">Your Order:</h2>
                    <ul className="space-y-2">
                        {order.items.map((item) => (
                            <li key={item.id} className="flex justify-between border border-light-wood p-2 rounded shadow-sm">
                                <span>{item.product.name} x {item.quantity}</span>
                                <span>&#8358; {item.subtotal.toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-2 font-bold text-right">Total: &#8358; {order.totalAmount.toLocaleString()}</p>
                </div>
            )}
        </div>
    );
}


