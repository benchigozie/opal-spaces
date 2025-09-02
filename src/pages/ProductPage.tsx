import api from "../api/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import Modal from "../components/Modal";

type ProductProps = {
    name: string,
    price: number,
    images: { url: string }[],
    averageRating: number,
    description?: string,
    stock: number,
    id?: string,
    onAddToCart?: () => void
    totalReviews: number,
};

type Review = {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
};


function ProductPage() {

    const [product, setProduct] = useState<ProductProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [reviewLoading, setReviewLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const { dispatch } = useCart();

    const handleAddToCart = (product: ProductProps) => {
        dispatch({
            type: "ADD_ITEM",
            payload: {
                id: product.id!,
                name: product.name,
                price: product.price,
                image: product.images[0]?.url || "",
                quantity: quantity
            }
        });
    };

    const handleSubmitReview = async () => {
        if (!rating || !comment.trim()) return;

        setIsSubmitting(true);
        setIsModalOpen(true);

        try {
             await api.post(`api/reviews/${id}/`, {
                rating,
                comment,
            });


            setRating(0);
            setComment("");
        } catch (err) {
            console.error("Failed to submit review", err);
        } finally {
            setReviewLoading(false);
            setIsSubmitting(false);
        }
    };

    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const resProd = await api.get(`api/products/${id}`);
                const resRev = await api.get(`api/reviews/${id}`);
                setProduct(resProd.data);
                setSelectedImage(resProd.data.images?.[0]?.url || null);
                console.log("these are the reviews", resRev.data);
                setReviews(resRev.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
                setReviewLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="h-[700px]">Loading...</div>;
    }
    if (!product) {
        return <div className="h-[700px]">Product not found</div>;
    }
    return (
        <section className="font-Inter text-my-gray">
            <div className="mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1300px]">
                <div className="flex flex-col gap-4">
                    <div className="w-full h-max flex items-center justify-center overflow-hidden self-start">
                        <img
                            className="rounded-3xl border-1 border-light-wood object-cover w-full"
                            src={selectedImage || ""}
                            alt={product.name}
                        />
                    </div>
                    <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 overflow-x-auto">
                        {product.images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(img.url)}
                                className={`w-full h-full rounded-lg overflow-hidden border-2 ${selectedImage === img.url
                                    ? "border-light-wood"
                                    : "border-transparent"
                                    }`}
                            >
                                <img
                                    src={img.url}
                                    alt={`${product.name} ${index + 1}`}
                                    className="object-cover w-full h-full"
                                />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-my-black font-Inria text-2xl">{product.name}</h2>
                    <div className="flex items-center">
                        <StarRating rating={product.averageRating} />
                        <span className="text-my-gray text-sm ml-2">({product.totalReviews} reviews)</span>
                    </div>
                    <p className="text-xl text-light-wood font-bold">&#8358;{product.price}</p>
                    <p className="text-my-gray">{product.description}</p>
                    <p className="text-my-gray">{
                        product.stock > 0 ? "In Stock" : "Out of Stock"
                    }</p>
                    <div className="text-my-gray flex items-center gap-2">
                        <button className="p-1 rounded-sm bg-gray-200" onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}>
                            <ChevronLeft className="cursor-pointer" />
                        </button>
                        <span>{quantity}</span>
                        <button className="p-1 rounded-sm bg-gray-200" onClick={() => setQuantity(prev => prev + 1)}>
                            <ChevronRight className="cursor-pointer" />
                        </button>
                    </div>
                    <button onClick={() => handleAddToCart(product)} className="mt-4 bg-light-wood text-my-white px-6 py-2 rounded-full hover:bg-light-wood/90 transition disabled:bg-gray-400 cursor-pointer flex justify-center gap-3" disabled={product.stock === 0}>
                        <ShoppingCart size={24} className="text-my-white" />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
            <div className="mx-auto px-4 flex flex-col gap-8 max-w-[1300px]">
                <hr className="border-t border-gray-300 w-full" />
                <div>
                    <h2 className="font-Inria text-my-black text-3xl mb-2">Customer Reviews</h2>
                    <div>
                        {reviews.length > 0 ? (
                            <ul className="flex flex-col gap-4 max-h-[350px] overflow-y-scroll max-w-[1015px]">
                                {reviews.map(r => (
                                    <li key={r.id} className="border border-light-wood p-3 rounded-lg max-w-[1000px]">
                                        <StarRating rating={r.rating} />
                                        <p>{r.comment}</p>
                                        <small className="text-xs text-gray-500">
                                            {new Date(r.createdAt).toLocaleDateString()}
                                        </small>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No reviews yet. Be the first!</p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h3>Review this product</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="block text-sm">Your rating (1-5)</label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={rating}
                                onChange={e => setRating(Number(e.target.value))}
                                className="rounded px-2 py-1 max-w-16 outline-gray-200 outline-2 focus:outline-light-wood"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="block text-sm">Your comment</label>
                            <textarea
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                className="rounded px-2 py-1 w-full max-w-[500px] min-h-24 outline-gray-200 outline-2 focus:outline-light-wood"
                            />
                        </div>
                        <button
                            onClick={handleSubmitReview}
                            disabled={reviewLoading}
                            className="bg-light-wood text-my-white max-w-[500px] px-4 py-2 rounded-md hover:bg-light-wood/90 disabled:bg-gray-400 cursor-pointer"
                        >
                            {reviewLoading ? "Submitting..." : "Submit Review"}
                        </button>

                    </div>
                </div>
                <hr className="border-t border-gray-300 w-full" />
            </div>
            <div className="mx-auto px-4 py-12 flex flex-col gap-8 max-w-[1300px]">
                <div>
                    <button className="bg-gray-100 px-4 text-my-gray cursor-pointer py-2 shadow-sm rounded-md">Shipping and Returns</button>
                </div>
                <div className="flex flex-col gap-8">
                    <div>
                        <h2 className="font-Inria text-my-black text-xl mb-2">Shipping Information</h2>
                        <p>Orders typically ship within 3-5 business days. We offer the following options</p>
                        <ul>
                            <li>Standard Shipping (3-5 business days): Flat fee of &#8358;3000</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-Inria text-my-black text-xl mb-2">Return Policy</h2>
                        <p>We accept returns within 14 days of delivery for unused items in original packaging. Return fees may apply. Please contact customer service to initiate a return.</p>
                    </div>
                </div>
            </div>
            {
                isModalOpen && <Modal onClose={() => setIsModalOpen(false)} isSubmitting={isSubmitting} message="Your review has been submitted"/>
            }
        </section>
    )
}

export default ProductPage