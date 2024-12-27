import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="px-4 py-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Orders</h3>
      <div className="space-y-6">
        {/* Reverse the orders array to display new orders first */}
        {[...orders].reverse().map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-6 items-start border border-gray-300 shadow-md rounded-lg p-6"
            key={index}
          >
            <img
              className="w-16 h-16 object-contain"
              src={assets.parcel_icon}
              alt="Parcel Icon"
            />
            <div className="text-gray-700">
              <div className="mb-4">
                {order.items.map((item, index) => (
                  <p className="py-1" key={index}>
                    {item.name} x {item.quantity}{" "}
                    <span className="text-gray-500">{item.size}</span>
                  </p>
                ))}
              </div>
              <p className="font-medium text-lg text-gray-900 mb-2">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="text-sm">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
                <p className="mt-2">Phone: {order.address.phone}</p>
              </div>
            </div>
            <div className="text-gray-700 text-sm">
              <p className="text-base font-medium mb-2">
                Items: {order.items.length}
              </p>
              <p>Method: {order.paymentMethod}</p>
              <p>
                Payment:{" "}
                <span
                  className={order.payment ? "text-green-600" : "text-red-600"}
                >
                  {order.payment ? "Done" : "Pending"}
                </span>
              </p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-lg font-semibold text-gray-800">
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className="p-2 border border-gray-300 rounded-md text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
