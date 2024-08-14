// import React from 'react';
// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

// const mapStyles = {
//   width: '100%',
//   height: '500px'
// };

// const MapContainer = ({ google }) => {
//   // Coordinates for the marker (example coordinates)
//   const markerLocation = {
//     lat: 27.1750152,
//     lng: 78.0421552
//   };

//   return (
//     <div style={{ width: '100%', height: '500px' }}>
//       <Map
//         google={google}
//         zoom={14}
//         style={mapStyles}
//         initialCenter={markerLocation}
//         center={markerLocation} // Center map on markerLocation
//       >
//         {/* Marker for the markerLocation */}
//         <Marker
//           position={markerLocation}
//           name="Order Location"
//         />
//       </Map>
//     </div>
//   );
// };

// export default GoogleApiWrapper({
//   apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY // Ensure your environment variables are correctly set
// })(MapContainer);
