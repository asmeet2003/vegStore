 
import React, { useState } from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteCartItem, increaseQty, decreaseQty } from "../redux/productSlide";

const CartProduct = ({ id, name, image, category, qty, total, price }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(qty);  

  const handleIncreaseQty = () => {
    setQuantity(quantity + 1);  
    dispatch(increaseQty(id)); // Dispatch action to increase quantity in Redux store
  };

  const handleDecreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);  
      dispatch(decreaseQty(id));  
    }
  };

  const handleDelete = () => {
    dispatch(deleteCartItem(id));
  };

  const calculateTotalPrice = () => {
    return quantity * price;  
  };

  return (
    <div className="bg-slate-200 p-2 flex gap-4 rounded border border-slate-300">
      <div className="p-3 bg-white rounded overflow-hidden">
        <img src={image} className="h-28 w-40 object-cover " alt={name} />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-600 capitalize text-lg md:text-xl">
            {name}
          </h3>
          <div
            className="cursor-pointer text-slate-700 hover:text-red-500"
            onClick={handleDelete}
          >
            <AiFillDelete />
          </div>
        </div>
        <p className="text-slate-500 font-medium ">{category}</p>
        <p className="font-bold text-base">
          <span className="text-red-500 ">₹</span>
          <span>{price}</span>
        </p>
        <div className="flex justify-between ">
          <div className="flex gap-3 items-center">
            <button
              onClick={handleDecreaseQty}
              className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1"
            >
              <TbMinus />
            </button>
            <p className="font-semibold p-1">{quantity}</p>
            <button
              onClick={handleIncreaseQty}
              className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1"
            >
              <TbPlus />
            </button>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <p>Total :</p>
            <p>
              <span className="text-red-500">₹</span>
              {calculateTotalPrice()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
