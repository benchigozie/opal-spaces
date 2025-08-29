import { Link } from "react-router-dom"
import CartItem from "../components/CartItem";
import arrow from "../assets/images/arrow.png";
import { useCart } from "../context/CartContext";
import { clearCartFromLocalStorage } from "../utils/cartUtils";



function Cart() {

  const { state, dispatch } = useCart();
  const shippingFee = 3000;


  const calculateTotal = () => {
    
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);

  }

  return (
    <section className="text-my-gray pt-4 bg-my-white font-Inter">
      <div className="max-w-[1300px] mx-auto flex flex-col gap-4 py-12 px-4">
        <div>
          <h1 className="text-my-black font-Inria font-bold text-2xl md:text-3xl">Your Shopping Cart</h1>
          <p>Review your selections</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-4 md:w-4/6">
            {
              state.items.length > 0 ? (
                state.items.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    quantity={item.quantity}
                  />
                ))
              ) : (
                <div className="text-center text-my-gray">Your cart is empty.</div>
              )
            }
          </div>
          <div className="md:w-2/6">
            <div className="bg-white shadow-md rounded-lg p-6 gap-7 flex flex-col sticky top-20">
              <h3 className="text-my-black font-Inria font-bold text-2xl">Order Summary</h3>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>&#8358;{calculateTotal()}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping fee (estimated)</p>
                  <p>&#8358;{shippingFee}</p>
                </div>
              </div>
              <hr className="bg-my-gray h-[1px] border-none" />
              <div className="flex justify-between font-bold">
                <p>Total</p>
                <p>&#8358;{(calculateTotal() + shippingFee).toLocaleString() }</p>
              </div>
              <div className="flex flex-col gap-2">
                <Link to="/checkout" className="rounded-full py-3 hover:bg-gray-200 hover:text-my-gray cursor-pointer bg-light-wood text-my-white w-full flex justify-center items-center gap-4"><span>Proceed to Checkout</span> <img src={arrow} className="w-6" alt="" /></Link>
                <div>
                  <Link to="" className="hover:text-light-wood underline">Continue Shopping</Link>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div>
          <button onClick={
            () => 
              {dispatch({ type: "CLEAR_CART" });
              clearCartFromLocalStorage();
          }
          } className="hover:text-light-wood cursor-pointer">Clear cart</button>
        </div>
      </div>
    </section>
  )
}

export default Cart