import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-10 px-4 sm:px-8 lg:px-16">
      <div className="text-3xl font-semibold mb-6">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="py-4 border-t border-gray-300 flex flex-col sm:flex-row sm:items-center gap-6"
            >
              {/* Product Image and Details */}
              <div className="flex gap-4 items-start sm:items-center w-full sm:w-3/5">
                <img
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
                  src={productData.image[0]}
                  alt={productData.name}
                />

                <div className="flex flex-col gap-2">
                  <p className="text-base sm:text-lg font-medium text-gray-800">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-3 py-1 border rounded-md bg-slate-100">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <div className="flex justify-center items-center w-full sm:w-1/5">
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                  className="border w-16 sm:w-20 px-2 py-1 text-center rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
              </div>

              {/* Delete Button */}
              <div className="flex justify-center items-center w-full sm:w-1/5">
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-5 sm:w-6 cursor-pointer hover:opacity-80"
                  src={assets.bin_icon}
                  alt="Remove Item"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px] ">
          <CartTotal />
          <div className="w-full text-center sm:text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-white text-black text-sm my-8 px-8 py-3 rounded-lg border hover:bg-black hover:text-white"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
