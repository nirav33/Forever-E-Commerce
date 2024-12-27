import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className="px-6 sm:px-12 lg:px-20 py-10 ">
      {/* About Us Section */}
      <div className="text-center pt-8 border-t border-gray-200">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-12 flex flex-col md:flex-row gap-12 items-center">
        {/* Image Section */}
        <img 
          className="w-full md:max-w-[450px] rounded-lg shadow-md" 
          src={assets.about_img} 
          alt="About Us" 
        />
        
        {/* About Us Content */}
        <div className="flex flex-col justify-center gap-6 text-gray-700 md:w-2/4">
          <p>
            Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. 
            Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, 
            and purchase a wide range of products from the comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater 
            to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an 
            extensive collection sourced from trusted brands and suppliers.
          </p>
          <b className="text-gray-900 text-lg">Our Mission</b>
          <p>
            Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to 
            providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center py-6">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm gap-8">
        {/* Quality Assurance */}
        <div className="border border-gray-200 shadow-sm rounded-lg px-8 py-10 flex flex-col gap-4 hover:shadow-md transition-shadow">
          <b className="text-lg text-gray-900">Quality Assurance:</b>
          <p className="text-gray-700">
            We meticulously select and vet each product to ensure it meets our stringent quality standards.
          </p>
        </div>

        {/* Convenience */}
        <div className="border border-gray-200 shadow-sm rounded-lg px-8 py-10 flex flex-col gap-4 hover:shadow-md transition-shadow">
          <b className="text-lg text-gray-900">Convenience:</b>
          <p className="text-gray-700">
            With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
          </p>
        </div>

        {/* Customer Service */}
        <div className="border border-gray-200 shadow-sm rounded-lg px-8 py-10 flex flex-col gap-4 hover:shadow-md transition-shadow">
          <b className="text-lg text-gray-900">Exceptional Customer Service:</b>
          <p className="text-gray-700">
            Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mt-16">
        <NewsletterBox />
      </div>
    </div>
  );
};

export default About;
