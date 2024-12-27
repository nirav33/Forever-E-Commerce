import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name
    const value = event.target.value

    setFormData(data => ({...data,[name]:value}))
  }

  const onSubmitHandler = async (event) =>{
    event.preventDefault()
    try {
      
      let orderItems = []

      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items))

            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee 
      }

      switch (method) {

        // API calls for COD
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers:{token}})
          // console.log(response.data);
          
          if(response.data.success){
            setCartItems({})
            navigate('/orders')
          }
          else{
            toast.error(response.data.message)
          }
          break;
      
        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers:{token}})
          if(responseStripe.data.success){
            const {session_url} = responseStripe.data
            window.location.replace(session_url)
          }
          else{
            toast.error(responseStripe.data.message)
          }
          
          break;  

        default:
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)      
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-6 pt-6 sm:pt-16 min-h-[80vh] border-t border-gray-200 px-4 sm:px-8'>
      {/* Left Side */}
      <div className='flex flex-col gap-5 w-full sm:max-w-lg'>

        <div className='text-xl sm:text-3xl my-4'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-4'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First name' className='border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring focus:ring-green-300' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last name' className='border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring focus:ring-green-300' />
        </div>

        <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email address' className='border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring focus:ring-green-300' />

        <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street' className='border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring focus:ring-green-300' />

        <div className='flex gap-4'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring focus:ring-green-300' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State' className='border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring focus:ring-green-300' />
        </div>

        <div className='flex gap-4'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" placeholder='Zipcode' className='border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring focus:ring-green-300' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Country' className='border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring focus:ring-green-300' />
        </div>

        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder='Phone' className='border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring focus:ring-green-300' />

      </div>

      {/* Right Side */}
      <div className='flex flex-col gap-8 w-full sm:max-w-md'>
        <div>
          <CartTotal />
        </div>

        <div>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          <div className='flex flex-col gap-4 lg:flex-row mt-4'>
            <div onClick={() => setMethod('stripe')} className={`flex items-center gap-4 border p-3 rounded-lg cursor-pointer ${method === 'stripe' ? 'border-green-500' : 'border-gray-300'} transition`}>              
              <span className={`w-4 h-4 border-2 rounded-full ${method === 'stripe' ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}></span>
              <img className='h-6' src={assets.stripe_logo} alt="Stripe Logo" />
            </div>

            <div onClick={() => setMethod('cod')} className={`flex items-center gap-4 border p-3 rounded-lg cursor-pointer ${method === 'cod' ? 'border-green-500' : 'border-gray-300'} transition`}>              
              <span className={`w-4 h-4 border-2 rounded-full ${method === 'cod' ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}></span>
              <p className='text-gray-600 text-base font-medium'>CASH ON DELIVERY</p>
            </div>
          </div>
        </div>

        <div className='flex justify-center sm:justify-end'>
          <button type='submit' className='bg-white text-black px-10 py-3 text-sm rounded-lg border hover:bg-black hover:text-white transition'>PLACE ORDER</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;