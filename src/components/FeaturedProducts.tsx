import Product from "./Product";
import api from "../api/axios";
import { useEffect, useState } from "react";

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

    const fetchProducts = async () => {
        try {
        const response = await api.get('api/products/featured');
        console.log('Featured Products:', response.data.products);
        setProducts(response.data.products);
        } catch (error) {
       console.error("Error fetching featured products:", error);
        }
    } 

    useEffect(() => {
        fetchProducts();
    }, []);

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
                            />
                        ))
                   }
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts