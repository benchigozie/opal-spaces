import Button from "./Button";
import StarRating from "./StarRating";

type ProductProps = {
  name: string,
  price: number,
  image: string,
  averageRating?: number,
}

function Product( { name, price, image, averageRating } : ProductProps ) {
  console.log(image);
  return (
    <div className="border-1 border-light-wood text-my-gray">
      <div className="h-52 w-full bg-gray-200">
        <img src={image} alt="" />
      </div>
      <div className="px-6 py-8 flex flex-col gap-1 font-Inter">
        <h4 className="text-my-black font-Inria font-bold text-xl">{name}</h4>
        <div>
          <StarRating rating={averageRating ?? 0} amount={100} />
        </div>
        <div className="flex items-center justify-between">
          <p>&#8358;{price}</p>
          <Button btnText="Add to Cart" className="text-my-white bg-light-wood hover:bg-light-wood/0 hover:text-light-wood rounded-full border-1 border-light-wood hover:cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default Product;