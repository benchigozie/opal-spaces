type ServiceProps = {
    name: string,
    description: string,
    image: string,
}
function Service( { name, description, image } : ServiceProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 font-Inter bg-white rounded-xl py-12 px-5 md:px-6 shadow-md">
        <div className="h-32 w-32 bg-my-gray rounded-full flex items-center justify-center mb-4 overflow-clip">
          <img src={image} alt="" />
        </div>
        <p className="text-light-wood font-bold">{name}</p>
        <p className="text-my-gray/90 text-center">{description}</p>
    </div>
  )
}

export default Service;