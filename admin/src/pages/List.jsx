import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-4 font-medium text-lg">All Product List</p>

      <div className="flex flex-col gap-3">
        {/* List table title */}
        <div className="hidden sm:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border bg-gray-200 text-sm font-semibold rounded-lg">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product list */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-3 py-2 px-3 border bg-white rounded-lg shadow-sm hover:shadow-md"
          >
            <img
              className="w-16 h-16 object-cover rounded-md border"
              src={item.image[0]}
              alt={item.name}
            />
            <p className="truncate text-gray-700 font-medium">{item.name}</p>
            <p className="text-gray-600 text-sm">{item.category}</p>
            <p className="text-gray-800 font-semibold">
              {currency} {item.price}
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-center text-red-500 font-bold cursor-pointer hover:text-red-700"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;