import Product from "./Product";
import api from "../api/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useCart } from "../context/CartContext";
import Loading from "./Loading";

type ProductType = {
    name: string;
    price: number;
    images: { url: string }[];
    averageRating?: number;
    id: string;
    reviewCount: number;
}

function FeaturedProducts() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const { dispatch } = useCart();
    const [ isLoading, setIsLoading ] = useState(true);

    const fetchProducts = async () => {
        try {
            const response = await api.get('api/products/featured');
           
            setProducts(response.data.products);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching featured products:", error);
        }
    }

    const handleAddToCart = (product: ProductType) => { 
        
        dispatch({
          type: "ADD_ITEM",
          payload: {
            id: product.id!,
            name: product.name,
            price: product.price,
            image: product.images[0]?.url || "",
            quantity: 1
          }
        });
      };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <section className="py-12 bg-my-white px-4">
            <div className="flex flex-col gap-12 max-w-[1300px] mx-auto">
                <div className="flex flex-col items-center">
                    <h2 className="text-my-black font-Inria font-bold text-2xl md:text-3xl">Top Selling Products</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 font-Inter text-my-gray">
                    {
                        products.map((product) => (
                            <Product
                                key={product.id}
                                name={product.name}
                                price={product.price}
                                images={product.images}
                                averageRating={product.averageRating}
                                idString={product.id}
                                onAddToCart={() => handleAddToCart(product)}
                            />
                        ))
                    }
                </div>
                <div className="flex justify-center">
                    <Link to="/shop" className="text-my-black font-Inter font-semibold border-b border-my-black hover:text-light-wood hover:border-light-wood transition-all duration-300">
                        <Button btnText="View All Products"/>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts