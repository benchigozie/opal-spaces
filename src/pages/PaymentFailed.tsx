import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function PaymentFailed() {
    return (
    <div className="flex justify-center py-24 font-Inter">
        <div className="max-w-[500px] flex flex-col items-center gap-2">
            <XCircle className="w-20 h-20 text-red-600 mb-4" />
            <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
            <p>Something went wrong. Please try again.</p>
            <Link
                to="/checkout"
                className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
                Try Again
            </Link>
        </div>
    </div>
    );
}