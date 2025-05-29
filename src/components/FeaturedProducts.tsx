import Product from "./Product"

function FeaturedProducts() {
    return (
        <section className="py-12 bg-my-white px-4">
            <div className="flex flex-col gap-12 max-w-[1300px] mx-auto">
                <div className="flex flex-col items-center">
                    <h2 className="text-my-black font-Inria font-bold text-2xl md:text-3xl">Top Selling Products</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 font-Inter text-my-gray">
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts