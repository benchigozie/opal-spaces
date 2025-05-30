import Button from "./Button";
import StarRating from "./StarRating";

function Product() {
  return (
    <div className="border-1 border-light-wood text-my-gray">
      <div className="h-52 w-full bg-gray-200">

      </div>
      <div className="px-6 py-8 flex flex-col gap-1 font-Inter">
        <h4 className="text-my-black font-Inria font-bold text-xl">Product Name</h4>
        <div>
          <StarRating rating={4.5} amount={100} />
        </div>
        <div className="flex items-center justify-between">
          <p>Price</p>
          <Button btnText="Add to Cart" className="text-my-white bg-light-wood hover:bg-light-wood/0 hover:text-light-wood rounded-full border-1 border-light-wood hover:cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default Product;