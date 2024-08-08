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
    try {
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
      console.error(`Error parsing sessionStorage item ${key}:`, e);
      return defaultValue;
    }
  };

  const [input1, setInput1] = useState(defaultValues.input1);
  const [input2, setInput2] = useState(defaultValues.input2);
  const [dropdown1, setDropdown1] = useState(defaultValues.dropdown1);
  const [dropdown2, setDropdown2] = useState(defaultValues.dropdown2);
  const [dropdown3, setDropdown3] = useState(defaultValues.dropdown3);
  const [result, setResult] = useState(null);
  const [showDetailedCalculations, setShowDetailedCalculations] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isRefreshed = sessionStorage.getItem('isRefreshed');
    if (isRefreshed) {
      setInput1(getSessionStorageOrDefault('input1', defaultValues.input1));
      setInput2(getSessionStorageOrDefault('input2', defaultValues.input2));
      setDropdown1(getSessionStorageOrDefault('dropdown1', defaultValues.dropdown1));
      setDropdown2(getSessionStorageOrDefault('dropdown2', defaultValues.dropdown2));
      setDropdown3(getSessionStorageOrDefault('dropdown3', defaultValues.dropdown3));
    }
    sessionStorage.setItem('isRefreshed', 'true');
  }, []);

  const fetchValues = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/values', data);
      if (response.headers['content-type'].includes('application/json')) {
        setResult(response.data);
      } else {
        throw new Error('Invalid JSON response');
      }
    } catch (error) {
      setError('Error fetching values data');
      console.error('Error fetching values data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const data = { input1, input2, dropdown1, dropdown2, dropdown3 };
    fetchValues(data);
  }, [input1, input2, dropdown1, dropdown2, dropdown3]);

  useEffect(() => {
    sessionStorage.setItem('input1', JSON.stringify(input1));
    sessionStorage.setItem('input2', JSON.stringify(input2));
    sessionStorage.setItem('dropdown1', JSON.stringify(dropdown1));
    sessionStorage.setItem('dropdown2', JSON.stringify(dropdown2));
    sessionStorage.setItem('dropdown3', JSON.stringify(dropdown3));
  }, [input1, input2, dropdown1, dropdown2, dropdown3]);

  const toggleDetailedCalculations = () => {
    setShowDetailedCalculations(!showDetailedCalculations);
  };

  const resetInputs = () => {
    setInput1(defaultValues.input1);
    setInput2(defaultValues.input2);
    setDropdown1(defaultValues.dropdown1);
    setDropdown2(defaultValues.dropdown2);
    setDropdown3(defaultValues.dropdown3);
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
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
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
              resetInputs={resetInputs}
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
