import Button from "./Button";
import StarRating from "./StarRating";

type ProductProps = {
  name: string,
  price: number,
  images: { url: string }[],
  averageRating?: number,
  onAddToCart?: () => void
}

function Product({ name, price, images, averageRating, onAddToCart }: ProductProps) {

  return (
    <div className="border-1 text-[15px] border-light-wood text-my-gray grid grid-rows-[0.9fr_1fr]">
      <div className="w-full">

        {

          images.length > 0 ? (
            <div className=" w-full h-full flex items-start justify-center">
              <img src={images[0].url} alt={name} className="object-contain" />
            </div>

          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <span className="text-light-wood">No Image Available</span>
            </div>
          )}
      </div>
      <div className="px-6 py-8 flex flex-col justify-end gap-1 font-Inter">
        <div className="flex items-center h-full">
          <h4 className="text-my-black font-Inria font-bold text-lg">{name}</h4>
        </div>
        <div>
          <StarRating rating={averageRating ?? 0} amount={100} />
        </div>
        <div className="flex items-center justify-between">
          <p>&#8358;{price}</p>
          <Button btnText="Add to Cart" onClick={onAddToCart} className="text-my-white bg-light-wood hover:bg-light-wood/0 hover:text-light-wood rounded-full border-1 border-light-wood hover:cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default Product;