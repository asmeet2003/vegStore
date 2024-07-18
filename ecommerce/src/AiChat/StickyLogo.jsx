import React from 'react';
import './StickyLogo.css'; // Import CSS for styling

const StickyLogo = ({ onClick }) => {
  return (
    <div 
      className="sticky-logo-container" // Custom CSS class for styling
      onClick={onClick}
    >
      <div className="logo-circle">
        <img 
          className="logo-img"
          src="https://img.freepik.com/premium-photo/ai-text-technology-smart-robot-science-artificial-intelligence-technology_995428-3664.jpg?size=626&ext=jpg&uid=R123706497&ga=GA1.1.716163241.1713455711&semt=ais" 
          alt="Support" 
        />
        <span className="chat-text">Chat with AI</span>
      </div>
    </div>
  );
};

export default StickyLogo;
