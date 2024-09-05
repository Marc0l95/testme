import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  const handleClick = () => {
    axios.get('http://localhost:8080/hello')
      .then(response => {
        // Adjust to handle the structured JSON response
        setMessage(response.data.data.message);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <div className="App">
      <button onClick={handleClick}>Say Hello</button>
      <div id="message">{message}</div>
    </div>
  );
}

export default App;
