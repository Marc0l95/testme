import React from 'react';
import './InfoButton.css'

const InfoButton = ({ content }) => {
  const handleClick = () => {
    const infoWindow = window.open('', 'InfoWindow', 'width=450,height=300');
    infoWindow.document.write(`
      <html>
        <head>
          <title>Information</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
  };

  return (
    <button onClick={handleClick} className="info-button">i</button>
  );
};

export default InfoButton;
