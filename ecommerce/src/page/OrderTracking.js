import React, { useState } from 'react';
import MapContainer from './MapContainer';

const OrderTracking = () => {
  const [showMap, setShowMap] = useState(false);

  const handleTrackOrder = () => {
    setShowMap(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-8">Track Your Order</h2>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleTrackOrder}
      >
        Track
      </button>
      {showMap && <MapContainer />}
    </div>
  );
};

export default OrderTracking;
