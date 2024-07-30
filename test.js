import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import InputContainer from './InputContainer';
import ValuesContainer from './ValuesContainer';
import DetailedCalculations from './DetailedCalculations';
import './MainApp.css';

function MainApp() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [dropdown1, setDropdown1] = useState('');
  const [dropdown2, setDropdown2] = useState('');
  const [dropdown3, setDropdown3] = useState('');
  const [result, setResult] = useState(null);
  const [showDetailedCalculations, setShowDetailedCalculations] = useState(false);

  useEffect(() => {
    const fetchValues = async () => {
      const data = { input1, input2, dropdown1, dropdown2, dropdown3 };
      try {
        const response = await axios.post('http://localhost:5000/values', data);
        setResult(response.data);
      } catch (error) {
        console.error('Error fetching values data:', error);
      }
    };

    fetchValues();
  }, [input1, input2, dropdown1, dropdown2, dropdown3]);

  const toggleDetailedCalculations = () => {
    setShowDetailedCalculations(!showDetailedCalculations);
  };

  return (
    <div className="MainApp">
      <Navbar />
      <div className="toggle-container">
        <button onClick={toggleDetailedCalculations} className="toggle-button">
          {showDetailedCalculations ? 'Back to Calculator' : 'Show Detailed Calculations'}
        </button>
      </div>
      <div className="container">
        {!showDetailedCalculations ? (
          <>
            <InputContainer
              input1={input1}
              setInput1={setInput1}
              input2={input2}
              setInput2={setInput2}
              dropdown1={dropdown1}
              setDropdown1={setDropdown1}
              dropdown2={dropdown2}
              setDropdown2={setDropdown2}
              dropdown3={dropdown3}
              setDropdown3={setDropdown3}
            />
            <ValuesContainer data={result} />
          </>
        ) : (
          <DetailedCalculations data={result} />
        )}
      </div>
    </div>
  );
}

export default MainApp;
