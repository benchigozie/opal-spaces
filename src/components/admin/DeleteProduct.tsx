import cancelImage from '../../assets/images/cancel.png';
import api from '../../api/axios';

type DeleteProductProps = {
    onClose: () => void,
    eachProduct: {
        name: string,
        description: string,
        price: number,
        stock: number,
        category?: { id: string, name: string },
        images: string[];
        id?: string;
    },
    refreshProducts: () => void,
}

function DeleteProduct({ onClose, eachProduct, refreshProducts }: DeleteProductProps) {

    const deleteProduct = async () => {
        try {
            console.log("Deleting product:", eachProduct);
            const response = await api.delete(`/api/products/${eachProduct.id}`);
            console.log("Product deleted successfully:", response.data);
            refreshProducts();
            onClose();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20 px-2 text-[15px]">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:max-w-4xl">
                <div className='flex items-center justify-between mb-4'>
                    <h1 className="font-Inria text-lg md:text-2xl text-my-black">Delete Product</h1>
                    <button type='button' className='w-6 h-6' onClick={onClose}>
                        <img src={cancelImage} alt="" />
                    </button>
                </div>
                <p>Are you sure you want to delete this product?</p>
                <div className="mt-4 flex justify-end gap-2">
                    <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
                    <button onClick={deleteProduct} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Delete</button>
                </div>
            </div>
        </div >
    )
}

export default DeleteProduct;