import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
    const [params] = useSearchParams();
    console.log(params);
    const ref = params.get("reference");

    return (
        <div className="flex justify-center py-24">
            <div className="max-w-[500px] flex flex-col items-center gap-2">
                <CheckCircle className="w-20 h-20 text-green-600 mb-4" />
                <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
                <p>Your reference: {ref}</p>
                <p className="text-gray-600 mt-2">Thank you for your purchase.</p>
                <Link
                    to="/shop"
                    className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}


