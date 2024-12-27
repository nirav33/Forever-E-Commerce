import React from 'react';

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center bg-gray-50 py-10 px-4 sm:px-8 rounded-lg shadow-md">
      {/* Heading */}
      <p className="text-2xl font-semibold text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-500 mt-3">
        Stay updated with our latest news and exclusive offers. Subscribe to our newsletter today!
      </p>

      {/* Form */}
      <form
        onSubmit={onSubmitHandler}
        className="mt-6 flex flex-col sm:flex-row items-stretch gap-4 w-full max-w-xl mx-auto"
      >
        {/* Input */}
        <input
          className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
          type="email"
          placeholder="Enter your email"
          required
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full sm:w-auto bg-black text-white text-sm px-6 py-3 rounded-md hover:bg-gray-800 transition-all"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
