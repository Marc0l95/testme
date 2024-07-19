import React, { useState, useEffect } from 'react';
import './InfoButton.css';

function InfoButton({ text }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setIsVisible(false);
    };

    if (isVisible) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div className="info-button-container">
      <button type="button" className="info-button" onClick={handleToggle}>i</button>
      {isVisible && (
        <div className="info-box">
          <button className="close-button" onClick={handleClose}>×</button>
          <div className="info-content">
            {text}
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoButton;
