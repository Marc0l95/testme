import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import InputContainer from './InputContainer';
import ValuesContainer from './ValuesContainer';
import DetailedCalculations from './DetailedCalculations';

const MainApp = ({ defaultValues }) => {
  const [input1, setInput1] = useState(defaultValues.input1);
  const [input2, setInput2] = useState(defaultValues.input2);
  const [dropdown1, setDropdown1] = useState(defaultValues.dropdown1);
  const [dropdown2, setDropdown2] = useState(defaultValues.dropdown2);
  const [dropdown3, setDropdown3] = useState(defaultValues.dropdown3);
  const [showDetailedCalculations, setShowDetailedCalculations] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const storedInput1 = JSON.parse(sessionStorage.getItem('input1'));
    const storedInput2 = JSON.parse(sessionStorage.getItem('input2'));
    const storedDropdown1 = JSON.parse(sessionStorage.getItem('dropdown1'));
    const storedDropdown2 = JSON.parse(sessionStorage.getItem('dropdown2'));
    const storedDropdown3 = JSON.parse(sessionStorage.getItem('dropdown3'));

    if (storedInput1 !== null) setInput1(storedInput1);
    if (storedInput2 !== null) setInput2(storedInput2);
    if (storedDropdown1 !== null) setDropdown1(storedDropdown1);
    if (storedDropdown2 !== null) setDropdown2(storedDropdown2);
    if (storedDropdown3 !== null) setDropdown3(storedDropdown3);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('input1', JSON.stringify(input1));
    sessionStorage.setItem('input2', JSON.stringify(input2));
    sessionStorage.setItem('dropdown1', JSON.stringify(dropdown1));
    sessionStorage.setItem('dropdown2', JSON.stringify(dropdown2));
    sessionStorage.setItem('dropdown3', JSON.stringify(dropdown3));
  }, [input1, input2, dropdown1, dropdown2, dropdown3]);

  useEffect(() => {
    const fetchValues = async () => {
      setLoading(true);
      setError(null);
      const data = { input1, input2, dropdown1, dropdown2, dropdown3 };
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

    fetchValues();
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
};

export default MainApp;
