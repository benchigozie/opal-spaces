import { Link } from "react-router-dom"
import CartItem from "../components/CartItem";
import arrow from "../assets/images/arrow.png";


function Cart() {
  return (
    <section className="text-my-gray pt-13 bg-my-white font-Inter">
      <div className="max-w-[1300px] mx-auto flex flex-col gap-4 py-12 px-4">
        <div>
          <h1 className="text-my-black font-Inria font-bold text-2xl md:text-3xl">Your Shopping Cart</h1>
          <p>Review your selections</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-4 md:w-4/6">
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
          <div className="md:w-2/6">
            <div className="bg-white shadow-md rounded-lg p-6 gap-7 flex flex-col">
              <h3 className="text-my-black font-Inria font-bold text-2xl">Order Summary</h3>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>&#8358;150000.00</p>
                </div>
                <div className="flex justify-between">
                  <p>Tax (estimated)</p>
                  <p>&#8358;1500.00</p>
                </div>
              </div>
              <hr className="bg-my-gray h-[1px] border-none" />
              <div className="flex justify-between font-bold">
                <p>Total</p>
                <p>&#8358;151500.00</p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="rounded-full py-3 hover:bg-gray-200 hover:text-my-gray cursor-pointer bg-light-wood text-my-white w-full flex justify-center items-center gap-4"><span>Proceed to Checkout</span> <img src={arrow} className="w-6" alt="" /></button>
                <div>
                  <Link to="" className="hover:text-light-wood underline">Continue Shopping</Link>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div>
          <Link to="" className="hover:text-light-wood">Continue Shopping</Link>
        </div>
      </div>
    </section>
  )
}

export default Cart