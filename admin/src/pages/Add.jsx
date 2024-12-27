import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full gap-4">
      <div>
        <p className="mb-2 font-medium text-gray-700">Upload Image</p>
        <div className="flex gap-4">
          {[image1, image2, image3, image4].map((image, idx) => (
            <label
              key={idx}
              htmlFor={`image${idx + 1}`}
              className="relative cursor-pointer border border-gray-300 rounded-md overflow-hidden w-24 h-24 bg-gray-50 hover:shadow-md transition"
            >
              <img
                className="object-cover w-full h-full"
                src={!image ? assets.upload_area : URL.createObjectURL(image)}
                alt=""
              />
              <input
                onChange={(e) =>
                  [setImage1, setImage2, setImage3, setImage4][idx](
                    e.target.files[0]
                  )
                }
                type="file"
                id={`image${idx + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 font-medium text-gray-700">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-lg px-4 py-2 border rounded-md focus:ring focus:ring-gray-200"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div>
        <p className="mb-2 font-medium text-gray-700">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-lg px-4 py-2 border rounded-md focus:ring focus:ring-gray-200"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <p className="mb-2 font-medium text-gray-700">Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-gray-200"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2 font-medium text-gray-700">Subcategory</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-gray-200"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2 font-medium text-gray-700">Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full sm:w-28 px-4 py-2 border rounded-md focus:ring focus:ring-gray-200"
            type="number"
            placeholder="25"
          />
        </div>
      </div>

      <div>
        <p className="mb-2 font-medium text-gray-700">Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
              className={`px-3 py-1 cursor-pointer rounded-md transition ${
                sizes.includes(size)
                  ? "bg-pink-100 text-pink-600"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label
          htmlFor="bestseller"
          className="cursor-pointer text-gray-700 font-medium"
        >
          Add to bestseller
        </label>
      </div>

      <button
        type="submit"
        className="w-32 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
