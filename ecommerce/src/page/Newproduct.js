
import React, { useState, useEffect } from 'react';
import { FaUpload } from "react-icons/fa";
import { ImagetoBase64 } from '../utility/ImagetoBase64';
import { toast } from 'react-hot-toast';//display notifications

const NewProduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });
  const [products, setProducts] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [productId, setProductId] = useState(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    setData((prev) => ({
      ...prev,
      image: data
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, image, category, price } = data;
    if (name && image && category && price) {
      const url = isUpdating ? `${process.env.REACT_APP_SERVER_DOMAIN}product/${productId}` : `${process.env.REACT_APP_SERVER_DOMAIN}uploadProduct`;
      const method = isUpdating ? 'PUT' : 'POST';

      const fetchData = await fetch(url, {
        method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const fetchRes = await fetchData.json();
      toast(fetchRes.message);
      setData({
        name: "",
        category: "",
        image: "",
        price: "",
        description: "",
      });
      setIsUpdating(false);
      setProductId(null);
      fetchProducts();
    } else {
      toast("Please enter all required fields");
    }
  };

  const fetchProducts = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}product`);
    const products = await response.json();
    setProducts(products);
  };

  const handleEdit = (product) => {
    setData(product);
    setProductId(product._id);
    setIsUpdating(true);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}product/${id}`, {
      method: 'DELETE'
    });
    const result = await response.json();
    toast(result.message);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">{isUpdating ? 'Update Product' : 'Add New Product'}</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input type="text" name="name" onChange={handleOnChange} value={data.name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
            <select name="category" onChange={handleOnChange} value={data.category} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="other">Select Category</option>
              <option value="fruits">Fruit</option>
              <option value="vegetable">Vegetable</option>
              <option value="icecream">Icecream</option>
              <option value="dosa">Dosa</option>
              <option value="pizza">Pizza</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col border-4 border-dashed w-full h-40 hover:bg-gray-100 hover:border-gray-300 group">
                <div className="flex flex-col items-center justify-center pt-7">
                  {data.image ? <img src={data.image} alt="Uploaded" className="max-h-40 w-full object-cover rounded" /> : <FaUpload className="w-10 h-10 text-gray-400 group-hover:text-gray-600" />}
                  <input type="file" name="image" onChange={uploadImage} className="hidden" />
                </div>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
            <input type="text" name="price" onChange={handleOnChange} value={data.price} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea rows="3" name="description" onChange={handleOnChange} value={data.description} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              {isUpdating ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
        <h2 className="text-2xl font-bold my-4">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white shadow-md rounded p-4">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4 rounded" />
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-gray-700">Category: {product.category}</p>
              <p className="text-gray-700">Price: {product.price}</p>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <div className="flex justify-between">
                <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit</button>
                <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
