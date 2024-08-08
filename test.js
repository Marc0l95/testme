import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import InputContainer from './InputContainer';
import ValuesContainer from './ValuesContainer';
import DetailedCalculations from './DetailedCalculations';
import './MainApp.css';

function MainApp() {
  const defaultValues = {
    input1: '',
    input2: '',
    dropdown1: '',
    dropdown2: '',
    dropdown3: ''
  };

  const getSessionStorageOrDefault = (key, defaultValue) => {
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  };

  const [input1, setInput1] = useState(getSessionStorageOrDefault('input1', defaultValues.input1));
  const [input2, setInput2] = useState(getSessionStorageOrDefault('input2', defaultValues.input2));
  const [dropdown1, setDropdown1] = useState(getSessionStorageOrDefault('dropdown1', defaultValues.dropdown1));
  const [dropdown2, setDropdown2] = useState(getSessionStorageOrDefault('dropdown2', defaultValues.dropdown2));
  const [dropdown3, setDropdown3] = useState(getSessionStorageOrDefault('dropdown3', defaultValues.dropdown3));
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

  useEffect(() => {
    sessionStorage.setItem('input1', JSON.stringify(input1));
  }, [input1]);

  useEffect(() => {
    sessionStorage.setItem('input2', JSON.stringify(input2));
  }, [input2]);

  useEffect(() => {
    sessionStorage.setItem('dropdown1', JSON.stringify(dropdown1));
  }, [dropdown1]);

  useEffect(() => {
    sessionStorage.setItem('dropdown2', JSON.stringify(dropdown2));
  }, [dropdown2]);

  useEffect(() => {
    sessionStorage.setItem('dropdown3', JSON.stringify(dropdown3));
  }, [dropdown3]);

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
