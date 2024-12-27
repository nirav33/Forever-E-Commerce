import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div className="py-16 px-4 sm:px-8">
      {/* Title Section */}
      <div className="text-center text-2xl sm:text-3xl font-semibold text-gray-800 border-t pt-10">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Contact Information Section */}
      <div className="my-16 flex flex-col gap-10 md:flex-row md:gap-16">
        {/* Image Section */}
        <div className="w-full md:max-w-[450px] mx-auto">
          <img className="w-full rounded-lg shadow-lg" src={assets.contact_img} alt="Contact" />
        </div>

        {/* Contact Details Section */}
        <div className="flex flex-col justify-center gap-6 md:w-1/2">
          {/* Store Information */}
          <div>
            <p className="font-semibold text-xl text-gray-800">Our Store</p>
            <p className="text-gray-600">
              45, Sunset Boulevard, Andheri West, <br />
              Mumbai, Maharashtra, India
            </p>
            <p className="text-gray-600">
              Tel: +91 123-456-7890 <br />
              Email: <a href="mailto:admin@forever.com" className="text-blue-600 hover:underline">admin@forever.com</a>
            </p>
          </div>

          {/* Careers Section */}
          <div>
            <p className="font-semibold text-xl text-gray-800">Careers at Forever</p>
            <p className="text-gray-600">Learn more about our teams and job openings.</p>
            <button className="w-full sm:w-40 rounded-md border border-black px-6 py-3 text-sm text-gray-800 hover:bg-black hover:text-white transition-all duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Box Section */}
      <NewsletterBox />
    </div>
  );
};

export default Contact;
