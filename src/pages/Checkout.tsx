import { useCart } from "../context/CartContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { checkoutSchema } from "../schema/checkoutValidationSchema";
import { startPaystackPayment } from "../utils/paystack";
import { useNavigate } from "react-router-dom";

type CheckoutValues = {
  email: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
};

const initialValues: CheckoutValues = {
  email: "",
  fullName: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};


function Checkout() {

  const navigate = useNavigate();
  const { state } = useCart();
  const cartTotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = 3000;
  const totalAmount = cartTotal + shippingFee;

  const handleSubmit = (values: CheckoutValues) => {
    console.log("in handle submit function");
    startPaystackPayment({
      email: values.email,
      amountNaira: totalAmount,
      metadata: {
        name: values.fullName,
        phone: values.phone,
        address: values.address,
      },
      onSuccess: (reference) => {
        console.log("Payment successful!", reference);
        navigate(`/payment-success?reference=${reference}`);
      },
      onCancel: () => {
        console.log("Payment Failed");
        navigate("/payment-failed");
      },
    });
  };

  return (
    <section className="text-my-gray pt-4 bg-my-white font-Inter">
      <div className="max-w-[1300px] mx-auto flex flex-col gap-4 py-12 px-4 items-center">
        <h1 className="text-my-black font-Inria font-bold text-2xl md:text-3xl">Checkout</h1>
        <div className="max-w-lg flex flex-col w-full">
          <Formik
            initialValues={initialValues}
            validationSchema={checkoutSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block mb-1">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="rounded-full shadow-sm py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown w-full"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block mb-1">Full Name</label>
                  <Field
                    type="text"
                    name="fullName"
                    className="rounded-full shadow-sm py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown w-full"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block mb-1">Phone</label>
                  <Field
                    type="text"
                    name="phone"
                    className="rounded-full shadow-sm py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown w-full"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block mb-1">Address</label>
                  <Field
                    type="text"
                    name="address"
                    className="rounded-full shadow-sm py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown w-full"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block mb-1">City</label>
                  <Field
                    type="text"
                    name="city"
                    className="rounded-full shadow-sm py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown w-full"
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block mb-1">Postal Code</label>
                  <Field
                    type="text"
                    name="postalCode"
                    className="rounded-full shadow-sm py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown w-full"
                  />
                  <ErrorMessage
                    name="postalCode"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mt-6">
                  <p className="text-lg font-semibold">
                    Total: ₦{totalAmount.toLocaleString()}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-light-wood text-white py-2 rounded hover:bg-light-wood/80 cursor-pointer"
                >
                  Pay with Paystack
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );

}

export default Checkout;