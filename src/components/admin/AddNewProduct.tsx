import cancelImage from '../../assets/images/cancel.png';
import brownPlusImage from '../../assets/images/brownplus.png';
import { Formik, Form, Field } from 'formik';
import api from '../../api/axios';
import type { FormikHelpers } from 'formik';
import { useState, useEffect } from 'react';

type AddProductsProps = {
    onClose: () => void,
    refreshProducts: () => void,
    //onSave: (product: Product) => void;
}


type FormValues = {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
};


function AddNewProduct({ onClose, refreshProducts }: AddProductsProps) {

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setSelectedFiles(filesArray);
            // Generate preview URLs
            const urls = filesArray.map(file => URL.createObjectURL(file));
            setPreviewUrls(urls);
        }
    }

    useEffect(() => {
        return () => {
          previewUrls.forEach((url) => URL.revokeObjectURL(url));
        };
      }, [previewUrls]);

    //console.log(selectedFiles);

    const submitEdit = async (
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>,
    ) => {
        try {
            const formData = new FormData();

            // Append text fields
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('price', values.price.toString());
            formData.append('stock', values.stock.toString());
            formData.append('category', values.category.trim());

            // Append images (optional)
            selectedFiles.forEach((file) => {
                formData.append('images', file); // 'images' must match field name in multer
            });

            for (const [key, value] of formData.entries()) {
                console.log('formData enrty');
                console.log(`${key}:`, value);
            }

            console.log('Submitting form data:', formData);
            // Send PUT request with FormData
            const res = await api.post(`/api/products/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Product added:', res.data);
            refreshProducts();
             // optionally update parent state
            onClose();        // close modal
        } catch (error) {
            console.error('Failed to add product:', error);
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20 px-2 text-[15px]">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:max-w-4xl">
                <Formik
                    initialValues={{
                        name: '',
                        description: '',
                        price: 0,
                        stock: 0,
                        category: '',
                    }}
                    onSubmit={submitEdit}
                >
                    {
                        ({ isSubmitting }) => (
                            <Form>
                                <div className='flex justify-between'>
                                    <h1 className="font-Inria text-lg md:text-2xl text-my-black">Add a New Product</h1>
                                    <button type='button' className='w-6 h-6' onClick={onClose}>
                                        <img src={cancelImage} alt="" />       
                                    </button>
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
                                    <div className='flex flex-col gap-5'>
                                        <div className='flex flex-col gap-1 justify-center'>
                                            <label htmlFor="product-name">Product Name</label>
                                            <Field type="text" name="name" id='product-name' className='py-2 px-4 outline-gray-300 focus:outline-light-wood outline-1 rounded-md' />
                                        </div>
                                        <div className='flex flex-col gap-1 justify-center'>
                                            <label htmlFor="product-description">Description</label>
                                            <Field name="description" as="textarea" id='product-description' rows={4} className='py-2 px-4 outline-gray-300 focus:outline-light-wood outline-1 rounded-md w-full resize-none' />
                                        </div>
                                        <div className='grid grid-cols-2 gap-3'>
                                            <div className='flex flex-col gap-1 justify-center'>
                                                <label htmlFor="product-price">Price (&#8358;)</label>
                                                <Field type="number" name="price" id='product-price' className='py-2 px-4 outline-gray-300 focus:outline-light-wood outline-1 rounded-md' />
                                            </div>
                                            <div className='flex flex-col gap-1 justify-center'>
                                                <label htmlFor="product-stock">Stock</label>
                                                <Field type="number" name='stock' id='product-stock' className='py-2 px-4 outline-gray-300 focus:outline-light-wood outline-1 rounded-md' />
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-1 justify-center'>
                                            <label htmlFor="product-category">Category</label>
                                            <Field name="category" as="select" id='product-category' className='py-2 px-4 appearance-none outline-gray-300 focus:outline-light-wood outline-1 rounded-md'>
                                                <option value="">Select Category</option>
                                                <option value="furniture">Furniture</option>
                                                <option value="lighting">Lighting</option>
                                                <option value="decor">decor</option>
                                                <option value="bathroom">Bathroom</option>
                                            </Field>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <h2>Product Image</h2>
                                        <div className='px-4 py-10 border-gray-300 rounded-xl border-dashed border-2 flex flex-col items-center justify-center'>
                                            <label htmlFor='file-upload' className='bg-very-light-wood w-14 rounded-full h-14 flex justify-center items-center cursor-pointer'>
                                                <img src={brownPlusImage} alt="" className='w-9' />
                                            </label>
                                            <p className='text-light-wood text-center p-2'>Click to Upload</p>
                                            <input
                                                type="file"
                                                id="file-upload"
                                                multiple
                                                onChange={handleFileChange}
                                                className='hidden' />
                                        </div>
                                        <div className='grid grid-cols-4'>
                                            {
                                                previewUrls.map((src, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <img src={src} alt="" />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-end'>
                                    <div className='flex gap-2'>
                                        <button type='button' className='outline-1 outline-gray-200 rounded-lg bg-my-white hover:bg-neutral-200 py-2 px-3 cursor-pointer' onClick={onClose}>Cancel</button>
                                        <button type="submit" disabled={isSubmitting} className='outline-1 outline-light-wood bg-light-wood hover:bg-light-wood/50 rounded-lg text-my-white py-2 px-3 cursor-pointer'>Add Product</button>
                                    </div>
                                </div>

                            </Form>
                        )
                    }
                </Formik>

            </div>
        </div >
    )
}

export default AddNewProduct;