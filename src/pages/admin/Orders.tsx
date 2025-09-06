function Orders() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className='font-Inria text-2xl text-my-black'>Orders</h1>
        <p>View and manage Orders</p>
      </div>
      <div className="flex flex-col rounded-md bg-my-white p-3 md:p-4 shadow-md">
        <div>
          <h2>Orders</h2>
          <div>
            <select name="" id="" className="outline-gray-200 focus:outline-gray-300 rounded-md p-2">
              <option value="ALL">All</option>  
              <option value="PENDING">Pending</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Orders