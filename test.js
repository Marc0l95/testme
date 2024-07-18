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
    <div className="info-button-container" onClick={(e) => e.stopPropagation()}>
      <button type="button" className="info-button" onClick={handleToggle}>i</button>
      {isVisible && (
        <div className="info-box" onClick={(e) => e.stopPropagation()}>
          <div className="info-content">
            {text}
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoButton;
