import React from 'react';
import { CgClose } from "react-icons/cg";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminDeleteProduct = ({
    onClose,
    productData,
    fetchdata
}) => {

    const handleDeleteProduct = async () => {
        const response = await fetch(SummaryApi.deleteProduct.url, {
            method: SummaryApi.deleteProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ _id: productData._id }) // Ensure '_id' is sent
        });

        if (response.ok) {
            const responseData = await response.json();

            if (responseData.success) {
                toast.success(responseData?.message);
                onClose();
                fetchdata();
            } else {
                toast.error(responseData?.message);
            }
        } else {
            const errorResponse = await response.json();
            toast.error(errorResponse?.message || "Failed to delete product");
        }
    };

    return (
        <div className='fixed w-full h-full bg-gray-800 bg-opacity-75 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-6 rounded-lg w-full max-w-md'>
                <div className='flex justify-between items-center pb-4 border-b border-gray-200'>
                    <h2 className='font-bold text-xl text-gray-800'>Delete Product</h2>
                    <div className='w-fit text-2xl text-gray-400 hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>
                <div className='py-6'>
                    <p className='text-gray-600 text-center'>
                        Are you sure you want to delete the product <span className='font-bold'>{productData.productName}</span>?
                    </p>
                </div>
                <div className='flex justify-end gap-4 mt-6'>
                    <button className='px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700' onClick={onClose}>Cancel</button>
                    <button className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700' onClick={handleDeleteProduct}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default AdminDeleteProduct;
