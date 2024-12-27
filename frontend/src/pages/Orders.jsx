import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () =>{
    try {
      if(!token){
        return null
      }
      
      const response = await axios.post(backendUrl + '/api/order/user-orders', {}, {headers:{token}})
      if(response.data.success){
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date

            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse());
        
      }
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className='border-t pt-10 px-4 sm:px-8 md:px-12'>
      <div className='text-2xl mb-6'>
        <Title text1={'MY'} text2={'ORDERS'} />
        <hr className='border-gray-300 mt-2' />
      </div>
      <div className='space-y-6'>
        {orderData.map((item, index) => (
          <div
            key={index}
            className='py-4 border-b border-gray-200 text-gray-700 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'
          >
            {/* Product Image and Details */}
            <div className='flex items-start gap-4 md:gap-6'>
              <img
                className='w-20 h-20 object-cover rounded-md sm:w-24 sm:h-24'
                src={item.image[0]}
                alt={item.name}
              />
              <div className='flex-1'>
                <p className='text-base sm:text-lg font-medium text-gray-800'>{item.name}</p>
                <div className='flex flex-wrap items-center gap-2 mt-1 sm:mt-2 text-sm sm:text-base text-gray-600'>
                  <p className='font-semibold text-gray-900'>{currency}{item.price}</p>
                  <p className='border-l border-gray-300 pl-2'>Quantity: {item.quantity}</p>
                  <p className='border-l border-gray-300 pl-2'>Size: {item.size}</p>
                </div>
                <p className='mt-1 text-sm sm:text-base text-gray-500'>
                  Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span>
                </p>
                <p className='mt-1 text-sm sm:text-base text-gray-500'>
                  Payment: <span className='text-gray-400'>{item.paymentMethod}</span>
                </p>
                 
              </div>
            </div>

            {/* Status and Action */}
            <div className='flex justify-between items-center gap-4 md:w-1/2'>
              <div className='flex items-center gap-2'>
                <span className='w-2 h-2 rounded-full bg-green-500'></span>
                <p className='text-sm sm:text-base'>{item.status}</p>
              </div>
              <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-white hover:bg-gray-800 transition'>
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
