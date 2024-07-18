import React, { useState, useEffect } from 'react';
import InfoButton from './InfoButton';
import Dropdown from './Dropdown';
import axios from 'axios';
import './InputContainer.css';

function InputContainer() {
  const [input1, setInput1] = useState(localStorage.getItem('input1') || '');
  const [input2, setInput2] = useState(localStorage.getItem('input2') || '');
  const [dropdown1, setDropdown1] = useState(localStorage.getItem('dropdown1') || '');
  const [dropdown2, setDropdown2] = useState(localStorage.getItem('dropdown2') || '');
  const [dropdown3, setDropdown3] = useState(localStorage.getItem('dropdown3') || '');

  useEffect(() => {
    const handleSubmit = async () => {
      const data = {
        input1,
        input2,
        dropdown1,
        dropdown2,
        dropdown3
      };
      try {
        const response = await axios.post('http://localhost:5000/submit', data);
        console.log(response.data);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    handleSubmit();
  }, [input1, input2, dropdown1, dropdown2, dropdown3]); // Dependencies for the useEffect

  useEffect(() => {
    localStorage.setItem('input1', input1);
  }, [input1]);

  useEffect(() => {
    localStorage.setItem('input2', input2);
  }, [input2]);

  useEffect(() => {
    localStorage.setItem('dropdown1', dropdown1);
  }, [dropdown1]);

  useEffect(() => {
    localStorage.setItem('dropdown2', dropdown2);
  }, [dropdown2]);

  useEffect(() => {
    localStorage.setItem('dropdown3', dropdown3);
  }, [dropdown3]);

  return (
    <div className="input-container">
      <form>
        <div className="form-group">
          <label htmlFor="input1">A Very Long Label for Input 1 That Should Be Visible</label>
          <div className="input-wrapper">
            <input 
              type="text" 
              id="input1" 
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
            />
            <div className="info-button-container">
              <InfoButton text="This is some information about Input 1." />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="input2">Input 2</label>
          <div className="input-wrapper">
            <input 
              type="text" 
              id="input2" 
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
            />
          </div>
        </div>
        <Dropdown 
          label="Dropdown 1" 
          infoText="This is some information about Dropdown 1." 
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' }
          ]}
          id="dropdown1"
          value={dropdown1}
          onChange={(e) => setDropdown1(e.target.value)}
        />
        <Dropdown 
          label="Dropdown 2" 
          infoText="This is some information about Dropdown 2." 
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' }
          ]}
          id="dropdown2"
          value={dropdown2}
          onChange={(e) => setDropdown2(e.target.value)}
        />
        <Dropdown 
          label="Dropdown 3" 
          infoText="This is some information about Dropdown 3." 
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' }
          ]}
          id="dropdown3"
          value={dropdown3}
          onChange={(e) => setDropdown3(e.target.value)}
        />
      </form>
    </div>
  );
}

export default InputContainer;
