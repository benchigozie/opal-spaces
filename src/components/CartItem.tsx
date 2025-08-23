import trash from "../assets/images/trash.png";
import { useCart } from "../context/CartContext";

type CartItemProps = {
    id: string;
    name: string;
    price: number;
    image?: string;
    quantity: number;
}

function CartItem({ name, price, image, quantity, id }: CartItemProps) {

    const { dispatch } = useCart();

    return (
        <div className='bg-white shadow-md rounded-lg p-6 gap-3 md:gap-5 flex'>
            <div className="flex items-center">
                <img src={image} alt="" className='bg-gray-200 w-25 h-auto rounded-lg' />
            </div>
            <div className='w-full'>
                <div>
                    <p className='font-Inria font-bold text-lg'>{name}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-light-wood font-semibold'>price: &#8358;{price}</p>
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className='w-20 md:w-24 flex justify-between items-center'>
                            <button onClick={() => {
                                dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: -1 } });
                            }} className='rounded-full outline-1 outline-light-wood/40 w-6 h-6 md:w-7 md:h-7 cursor-pointer'>-</button>
                            <span className=''>{quantity}</span>
                            <button onClick={() => {
                                dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: 1 } });
                            }}
                                className='rounded-full outline-1 outline-light-wood/40 w-6 h-6 md:w-7 md:h-7 cursor-pointer'>+</button>
                        </div>
                        <button onClick={() => {
                            dispatch({ type: "REMOVE_ITEM", payload: id });
                        }}
                        className="cursor-pointer"
                        >
                            <img src={trash} alt="" className="w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem