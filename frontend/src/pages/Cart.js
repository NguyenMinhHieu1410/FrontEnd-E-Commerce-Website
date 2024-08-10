import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayVNDCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const loadingCart = new Array(4).fill(null);

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        });

        const responseData = await response.json();

        if (responseData.success) {
            setData(responseData.data);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({ _id: id, quantity: qty })
        });

        const responseData = await response.json();

        if (responseData.success) {
            setData(prevData => 
                prevData.map(product => 
                    product._id === id ? { ...product, quantity: qty } : product
                )
            );
        }
    };

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({ _id: id })
        });

        const responseData = await response.json();

        if (responseData.success) {
            setData(prevData => prevData.filter(product => product._id !== id));
            context.fetchUserAddToCart();
        }
    };
    const handlePayment = async()=>{

        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
        const response = await fetch(SummaryApi.payment.url,{
            method : SummaryApi.payment.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify({
                cartItems : data
            })
        })               

        const responseData = await response.json()

        if(responseData?.id){
            stripePromise.redirectToCheckout({ sessionId : responseData.id})
        }

        console.log("payment response",responseData)
    }

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * (curr?.productId?.sellingPrice || 0)), 0);

    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {data.length === 0 && !loading && (
                    <p className='bg-white py-5'>No Data</p>
                )}
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                <div className='w-full max-w-3xl'>
                    {loading ? (
                        loadingCart.map((_, index) => (
                            <div key={"AddToCartLoading" + index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'></div>
                        ))
                    ) : (
                        data.map((product, index) => {
                            const { productId, quantity, _id } = product || {};
                            const { productName, productImage, sellingPrice, category } = productId || {};
                            return (
                                <div key={_id + "AddToCartProduct"} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                    <div className='w-32 h-32 bg-slate-200'>
                                        {productImage && productImage[0] && (
                                            <img src={productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' alt={productName} />
                                        )}
                                    </div>
                                    <div className='px-4 py-2 relative'>
                                        <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(_id)}>
                                            <MdDelete />
                                        </div>

                                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{productName || 'Unknown Product'}</h2>
                                        <p className='capitalize text-slate-500'>{category || 'Unknown Category'}</p>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-red-600 font-medium text-lg'>{displayVNDCurrency(sellingPrice)}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>{displayVNDCurrency(sellingPrice * quantity)}</p>
                                        </div>
                                        <div className='flex items-center gap-3 mt-1'>
                                            <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => updateQty(_id, quantity - 1)} disabled={quantity <= 1}>-</button>
                                            <span>{quantity}</span>
                                            <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => updateQty(_id, quantity + 1)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

              {/***summary  */}
                {
                    data[0] && (
                        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {
                            loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                
                            </div>
                            ) : (
                                <div className='h-36 bg-white'>
                                    <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Quantity</p>
                                        <p>{totalQty}</p>
                                    </div>

                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Total Price</p>
                                        <p>{displayVNDCurrency(totalPrice)}</p>    
                                    </div>

                                    <button className='bg-blue-600 p-2 text-white w-full mt-2' onClick={handlePayment}>Payment</button>

                                </div>
                            )
                        }
                        </div>
                    )
                }
                
            </div>
        </div>
    );
};

export default Cart;
