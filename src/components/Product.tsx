import Button from "./Button";

function Product() {
  return (
    <div className="border-1 border-light-wood">
      <div className="h-52 w-full bg-gray-200">
        
      </div>
      <div className="px-6 py-8">
        <h4>Product Name</h4>
        <p>stars ()</p>
        <div className="flex items-center justify-between">
          <p>Price</p>
          <Button btnText="Add to Cart" className="text-my-white bg-light-wood hover:bg-light-wood/0 hover:text-light-wood rounded-full border-1 border-light-wood hover:cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default Product;