type ProjectProps = {
    name: string,
    location: string,
    style: string,
    description: string,
    image: string,
};

function Project( { name, location, style, description, image } : ProjectProps ) {
  return (
    <div className="bg-gray-100 rounded-xl shadow-md">
        <div className="h-max max-h-[339px] overflow-clip object-fill rounded-xl">
            <img src={image} alt="" />
        </div>
        <div className="px-5 md:px-6 py-8 text-my-brown flex flex-col gap-3">
            <div>
                <p>Name: <span className="text-my-gray">{name}</span></p>
  
                <p>Location: <span className="text-my-gray">{location}</span></p>
                <p>Style: <span className="text-my-gray">{style}</span></p>
            </div>
            <div>
                <p className="text-my-gray">{description}</p>
            </div>
        </div>
    </div>
  )
}

export default Project