import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (event) =>{
    event.preventDefault();
    try {
      if(currentState === 'Sign Up'){
        const response = await axios.post(backendUrl + '/api/user/register', {name,email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
      else{
        const response = await axios.post(backendUrl + '/api/user/login', {email,password})
        if(response.data.success){
          toast.success("Login successfully")
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-4'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] mt-3 w-8 bg-gray-800' />
      </div>

      {currentState === 'Sign Up' && (
        <input
          onChange={(e)=>setName(e.target.value)}
          value={name}
          type="text"
          className='w-full px-3 py-2 border border-gray-800 rounded-md'
          placeholder='Enter Name'
          required
        />
      )}
      <input
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        type="email"
        className='w-full px-3 py-2 border border-gray-800 rounded-md'
        placeholder='Enter Email'
        required
      />
      <input
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        type="password"
        className='w-full px-3 py-2 border border-gray-800 rounded-md'
        placeholder='Enter Password'
        required
      />

      <div className='w-full flex justify-between items-center text-sm mt-[-8px]'>
        {currentState === 'Login' && (
          <p className='text-blue-600 cursor-pointer'>Forgot your password?</p>
        )}

        <div className='text-left'>
          {currentState === 'Login' ? (
            <p
              onClick={() => setCurrentState('Sign Up')}
              className='cursor-pointer text-gray-800 hover:underline'
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState('Login')}
              className='cursor-pointer text-gray-800 hover:underline'
            >
              Login Here
            </p>
          )}
        </div>
      </div>

      <button
        className='bg-black text-white font-light px-8 py-2 mt-4 rounded-md hover:bg-gray-800 transition-colors'
      >
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
