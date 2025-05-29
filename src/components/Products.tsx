import Button from "./Button";
import Filter from "./Filter"
import Product from "./Product";

function Products() {



    return (
        <section>
            <Filter />
            <div className="py-12">
                <div className="max-w-[1300px] mx-auto md:px-4">
                    <div>
                        <Button btnText="All Products" className="rounded-full bg-light-wood" />
                        <Button btnText="Decor" className="rounded-full bg-light-wood" />
                        <Button btnText="Furniture" className="rounded-full bg-light-wood" />
                        <Button btnText="Lighting" className="rounded-full bg-light-wood" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-my-white">
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
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
            </div>
        </section>
    )
}

export default Products;