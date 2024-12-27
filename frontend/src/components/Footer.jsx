import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='pt-8 px-4 sm:px-8 md:px-12'>
      {/* Footer Content */}
      <div className='flex flex-col gap-10 sm:grid sm:grid-cols-1 md:grid-cols-[2fr_1fr_1fr] md:gap-16 my-10 mt-40 text-sm'>
        {/* Logo and Description */}
        <div>
          <img src={assets.logo} className='mb-5 w-28 sm:w-32' alt="Logo" />
          <p className='text-gray-600 leading-relaxed'>
          Forever brings you premium shopping with top-quality products and excellent customer support. Discover exclusive collections, enjoy great deals, and stay connected through social media for the latest updates. Shop confidently and experience the best in online shopping with us!
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className='text-lg sm:text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li className='hover:text-gray-800 transition'>Home</li>
            <li className='hover:text-gray-800 transition'>About us</li>
            <li className='hover:text-gray-800 transition'>Delivery</li>
            <li className='hover:text-gray-800 transition'>Privacy policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className='text-lg sm:text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li className='hover:text-gray-800 transition'>+1-212-456-7890</li>
            <li className='hover:text-gray-800 transition'>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div>
        <hr className='border-gray-300' />
        <p className='py-5 text-xs sm:text-sm text-center text-gray-500'>
          Copyright 2024@ forever.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
