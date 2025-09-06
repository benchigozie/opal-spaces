import plusImage from '../../assets/images/plus.png';
import searchImage from '../../assets/images/search.png';
import api from "../../api/axios";
import { useEffect, useState } from "react";
import editImage from '../../assets/images/edit.png';
import deleteImage from '../../assets/images/delete.png';
import EditProduct from '../../components/admin/EditProduct';
import { normalizeProduct } from '../../utils/normalizeProductImages';
import AddNewProduct from '../../components/admin/AddNewProduct';
import DeleteProduct from '../../components/admin/DeleteProduct';

type ProductType = {
  name: string;
  rating?: number;
  price: number;
  images: string[];
  stock: number;
  description: string;
  category?: { id: string; name: string };
  averageRating?: number;
  id?: string;
};

function Products() {

  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductType>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: { id: '', name: '' },
    images: [],
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const editProductFunction = ( product : ProductType ) => {
    console.log("Editing product:", product);
    setSelectedProduct(product);
    toggleEditModal();
  }

  const deleteProductFunction = (product: ProductType) => {
    console.log("Deleting product:", product);
    setSelectedProduct(product);
    toggleDeleteModal();
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get('api/products/all');

      const normalizedProducts = normalizeProduct(response.data.products);
      
      setProducts(normalizedProducts);
      
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className='font-Inria text-2xl text-my-black'>Products</h1>
        <p>Manage your products.</p>
      </div>
      <div className="flex flex-col rounded-md bg-my-white p-3 md:p-4 shadow-md">
        <div className="items-center justify-between border-b-1 border-gray-200 pb-4 grid grid-cols-1 md:grid-cols-[1fr_10fr_1fr] gap-3">
          <div className="rounded-md outline-1 outline-light-wood py-2 px-2 md:px-4 flex gap-2">
            <button className="cursor-pointer">
              <img src={searchImage} alt="" className="w-4" />
            </button>
            <input type="text" className="text-my-gray min-w-1/2 md:min-w-10 outline-none" placeholder="search for a product" />
          </div>
          <div></div>
          <div onClick={toggleAddModal} className="text-my-white bg-light-wood flex w-30 md:w-36 items-center justify-between md:px-4 md:py-2 px-3 py-1 rounded-lg hover:scale-105 cursor-pointer transition-transform duration-300">
            <img src={plusImage} alt="" className="w-3 h-3 md:w-4 md:h-4" />
            <button type='button' className="text-[14px]" >Add Product</button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <table>
            <thead>
              <tr className='text-[13px] md:text-[15px]'>
                <th className='p-1 md:p-3 text-left'>Image</th>
                <th className='p-1 md:p-3 text-left'>Name</th>
                <th className='p-1 md:p-3 text-left hidden lg:table-cell'>Price</th>
                <th className='p-1 md:p-3 text-left hidden lg:table-cell'>Stock</th>
                <th className='p-1 md:p-3 text-left hidden md:table-cell'>Status</th>
                <th className='p-1 md:p-3 text-left'><span className='hidden md:table-cell'>Actions</span><span className='md:hidden'>A..</span></th>
              </tr>
            </thead>
            <tbody>
              {
                products.map((product) => {
                
                  return (
                    <tr key={product.id} className="border-t-1 border-gray-300 text-[15px]">
                      <td className="px-1 md:px-3 py-2 md:py-4 gap-3 align-middle">
                        {product.images[0]? (
                          <img
                            src={product.images[0]}
                            alt=''
                            className="w-10 h-10 object-cover rounded"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-500 text-[10px]">No Image</span>
                          </div>
                        )
                        }
                      </td>
                      <td className="px-1 md:px-3 py-2 md:py-4 gap-3 align-middle">
                        <span>{product.name}</span>
                      </td>
                      <td className="px-1 md:px-3 py-2 md:py-4 align-middle hidden lg:table-cell">&#8358;{product.price.toFixed(2)}</td>
                      <td className="px-1 md:px-3 py-2 md:py-4 align-middle hidden lg:table-cell">{product.stock}</td>
                      <td className="px-1 md:px-3 py-2 md:py-4 align-middle hidden md:table-cell">
                        {product.stock > 0 ? (
                          <span className="text-green-400 font-medium">In Stock</span>
                        ) : (
                          <span className="text-red-500 font-medium">Out of Stock</span>
                        )}
                      </td>
                      <td className="px-1 md:px-3 py-2 md:py-4 align-middle">
                        <button className="mx-1 py-1 rounded cursor-pointer w-5 md:w-7" onClick={() => {
                          editProductFunction(product)}
                          }>
                          <img src={editImage} alt="" className='' />
                        </button>
                        <button 
                          onClick={
                            () => deleteProductFunction(product)
                          }
                          className="mx-1 py-1 rounded cursor-pointer w-5 md:w-7">
                          <img src={deleteImage} alt="" />
                        </button>
                      </td>
                    </tr>

                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      {
        isEditModalOpen && <EditProduct onClose={toggleEditModal} eachProduct={selectedProduct} refreshProducts={fetchProducts}/>
      }
      {
        isAddModalOpen && <AddNewProduct onClose={toggleAddModal} refreshProducts={fetchProducts} />
      }
      {
        isDeleteModalOpen && <DeleteProduct onClose={toggleDeleteModal} eachProduct={selectedProduct} refreshProducts={fetchProducts}/>
      }
    </div>

  )
}

export default Products;