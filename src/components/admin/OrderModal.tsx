import { ClipLoader } from 'react-spinners';
import cancelImage from '../../assets/images/cancel.png';
import api from '../../api/axios';
import { useState, useEffect } from 'react';


type orderModalValues = {
    id: string,
    onClose: () => void,
    isSubmitting: boolean,
}

export interface OrderResponse {
    order: Order;
}

export interface Order {
    id: string;
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
    };
    items: OrderItem[];
    totalAmount: number;
    status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    id: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    product: {
        id: string;
        name: string;
        price: number;
        description: string;
        images: { id: string; url: string }[];
    };
}


function OrderModal({ onClose, id, isSubmitting }: orderModalValues) {

    const [fetchedOrder, setFetchedOrder] = useState<Order | null>(null);
    const [orderStatus, setOrderStatus] = useState<string>(fetchedOrder?.status || "");
    const [showStatusOptions, setShowStatusOptions] = useState<boolean>(false);

    const statusOptions: string[] = ["PAID", "PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];

    const fetchProductById = async (id: string) => {
        try {
            const response = await api.get<OrderResponse>(`/api/orders/${id}`);
            console.log("Fetched order:", response.data.order.status);
            setFetchedOrder(response.data.order);
            console.log(response.data);
            console.log("Fetched order state:", fetchedOrder);
        } catch (error) {
            console.error("Error fetching product by ID:", error);
            throw error;
        }
    };

    const updateOrderStatus = async (newStatus: string) => {
        try {
            const response = await api.put<OrderResponse>(`/api/orders/status/${id}`, { status: newStatus });
            console.log("Order status updated:", response.data.order.status);
            setFetchedOrder(response.data.order);
            setOrderStatus(response.data.order.status);
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    }

    console.log("Order ID in Modal:", id);

    useEffect(() => {
        fetchProductById(id);
    }, [id]);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full md:max-w-4xl">
                <div className='overflow-y-scroll max-h-[80vh] hide-scrollbar'>
                    <div className='flex justify-between'>
                        <h1 className="font-Inria text-lg md:text-2xl text-my-black">View Order</h1>
                        <button type='button' className='w-6 h-6' onClick={onClose}>
                            <img src={cancelImage} alt="" />
                        </button>
                    </div>
                    <div>
                        {!isSubmitting ?
                            <div className='flex justify-center'><ClipLoader size={20} color="var(--color-light-wood)" /></div> :
                            <div>
                                <div>
                                    <p className='mb-2'>Order ID: {id}</p>
                                    <div className='relative'>
                                        <button onClick={() => setShowStatusOptions(!showStatusOptions)} className='bg-light-wood text-white px-3 py-2 rounded-md hover:bg-my-brown hover:cursor-pointer'>
                                            <p>Status: {fetchedOrder?.status}</p>
                                        </button>
                                        <ul className={`bg-gray-100 top-12 text-[13px] w-27 shadow-md absolute ${showStatusOptions ? 'block' : 'hidden'}`}>
                                            {statusOptions.map((status) => (
                                                <li key={status} className='w-full'>
                                                    <button
                                                        onClick={() => {
                                                            setOrderStatus(status);
                                                            updateOrderStatus(status);
                                                            setShowStatusOptions(false);
                                                        }}
                                                        className={`px-3 py-2  w-full hover:cursor-pointer text-my-gray hover:bg-gray-300`}
                                                    >
                                                        {status}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <h2 className="font-semibold mt-4">Items:</h2>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-3 mt-4'>
                                        {fetchedOrder?.items.map((item) => (
                                            <div>
                                                <div className='w-20'>
                                                    <img className='rounded-sm' src={item.product.images[0].url} alt="" />
                                                </div>
                                                <div key={item.id} className="py-2">
                                                    <p><span className='text-my-black font-bold'>Product Name:</span> {item.product.name}</p>
                                                    <p><span className='text-my-black font-bold'>Quantity:</span> {item.quantity}</p>
                                                    <p><span className='text-my-black font-bold'>Unit Price:</span> &#8358;{item.unitPrice.toFixed(2)}</p>
                                                    <p><span className='text-my-black font-bold'>Subtotal:</span> &#8358;{item.subtotal.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <button onClick={onClose} className="mt-4 text-mygreen font-semibold underline">
                                        Close
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderModal;