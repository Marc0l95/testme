import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormComponent from './FormComponent'; // Import the new component
import './InputContainer.css';

function InputContainer() {
  const getInitialValue = (key, defaultValue) => {
    const savedValue = sessionStorage.getItem(key);
    if (savedValue === null) {
      sessionStorage.setItem(key, defaultValue);
      return defaultValue;
    }
    return savedValue;
  };

  const [input1, setInput1] = useState(getInitialValue('input1', 'defaultInput1'));
  const [input2, setInput2] = useState(getInitialValue('input2', 'defaultInput2'));
  const [dropdown1, setDropdown1] = useState(getInitialValue('dropdown1', 'option1'));
  const [dropdown2, setDropdown2] = useState(getInitialValue('dropdown2', 'option1'));
  const [dropdown3, setDropdown3] = useState(getInitialValue('dropdown3', 'option1'));

  const sendDataToBackend = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/submit', data);
      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleInputChange = (setter, key) => (e) => {
    const value = e.target.value;
    setter(value);
    sessionStorage.setItem(key, value);
    const data = {
      input1,
      input2,
      dropdown1,
      dropdown2,
      dropdown3,
      [e.target.id]: value,
    };
    sendDataToBackend(data);
  };

  const resetToDefaultValues = () => {
    const defaultValues = {
      input1: 'defaultInput1',
      input2: 'defaultInput2',
      dropdown1: 'option1',
      dropdown2: 'option1',
      dropdown3: 'option1',
    };

    Object.keys(defaultValues).forEach(key => {
      sessionStorage.setItem(key, defaultValues[key]);
    });

    setInput1(defaultValues.input1);
    setInput2(defaultValues.input2);
    setDropdown1(defaultValues.dropdown1);
    setDropdown2(defaultValues.dropdown2);
    setDropdown3(defaultValues.dropdown3);

    sendDataToBackend(defaultValues);
  };

  useEffect(() => {
    const initialData = {
      input1,
      input2,
      dropdown1,
      dropdown2,
      dropdown3,
    };
    sendDataToBackend(initialData);
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    const data = {
      input1,
      input2,
      dropdown1,
      dropdown2,
      dropdown3,
    };
    sendDataToBackend(data);
  }, [input1, input2, dropdown1, dropdown2, dropdown3]); // Dependencies array to watch for changes

  return (
    <div className="input-container">
      <button onClick={resetToDefaultValues}>Reset to Default</button>
      <FormComponent
        input1={input1}
        input2={input2}
        dropdown1={dropdown1}
        dropdown2={dropdown2}
        dropdown3={dropdown3}
        handleInputChange={handleInputChange}
        setInput1={setInput1}
        setInput2={setInput2}
        setDropdown1={setDropdown1}
        setDropdown2={setDropdown2}
        setDropdown3={setDropdown3}
      />
    </div>
  );
}

export default InputContainer;
