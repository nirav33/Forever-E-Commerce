import React, { useState } from 'react';
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
      try {
        e.preventDefault();
        const response = await axios.post(backendUrl + '/api/user/admin', {email, password})
        if(response.data.success){
          setToken(response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

  return (
    <div className='min-h-screen flex items-center justify-center px-4 sm:px-0 bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg px-6 py-8 w-full max-w-sm sm:max-w-md'>
        <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          {/* Email Input */}
          <div className='mb-5'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
              Email Address
            </label>
            <input
              onChange={(e)=>setEmail(e.target.value)} value={email}
              id='email'
              className='rounded-md w-full px-4 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              type='email'
              placeholder='your@email.com'
              required
            />
          </div>

          {/* Password Input */}
          <div className='mb-5'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
              Password
            </label>
            <input
              onChange={(e)=>setPassword(e.target.value)} value={password}
              id='password'
              className='rounded-md w-full px-4 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              type='password'
              placeholder='Enter your password'
              required
            />
          </div>

          {/* Login Button */}
          <button
            className='w-full px-4 py-3 rounded-md bg-black text-white font-semibold hover:bg-gray-600 transition duration-200'
            type='submit'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;