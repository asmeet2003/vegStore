  
import React from "react";
import { Link } from "react-router-dom";

const HomeCard = ({ name, image, category, price, loading, id }) => {
  return (
    <div className="flex flex-wrap">
      <div className="bg-white shadow-md p-4 rounded-lg min-w-[150px] transition-transform hover:-translate-y-1 hover:shadow-lg mr-4 mb-4">
        {name ? (
          <Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
            <div className="w-40 h-40 overflow-hidden rounded-lg">
              <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg mt-2 capitalize text-center">{name}</h3>
            <p className="text-gray-600 text-center">{category}</p>
            <p className="text-center font-bold text-red-500 mt-1">₹{price}</p>
            <button className='mt-2 bg-red-500 hover:bg-blue-500 py-2 px-4 rounded-md text-white shadow-md transition-colors duration-300 ease-in-out'>
              Add to Cart
            </button>
          </Link>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p>{loading}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeCard;
