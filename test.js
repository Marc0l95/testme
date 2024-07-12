import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function GcpCalculator() {
  const [fieldA, setFieldA] = useState('Option A1');
  const [fieldB, setFieldB] = useState('Option B1');
  const [fieldC, setFieldC] = useState('Option C1');
  const [cpu, setCpu] = useState('');
  const [memory, setMemory] = useState('');
  const [subtotal, setSubtotal] = useState(0);

  const optionsA = ['Option A1', 'Option A2', 'Option A3'];
  const optionsB = ['Option B1', 'Option B2', 'Option B3'];
  const optionsC = ['Option C1', 'Option C2', 'Option C3'];

  useEffect(() => {
    calculateSubtotal();
  }, [fieldA, fieldB, fieldC, cpu, memory]);

  const calculateSubtotal = async () => {
    if (!cpu && !memory) {
      setSubtotal(0);
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/calculate', {
        fieldA,
        fieldB,
        fieldC,
        cpu: parseFloat(cpu) || 0,
        memory: parseFloat(memory) || 0
      });
      const calculatedSubtotal = response.data.cost;
      setSubtotal(calculatedSubtotal);
    } catch (error) {
      console.error("There was an error making the request:", error);
      setSubtotal(0);
    }
  };

  const Dropdown = ({ label, options, value, onChange }) => {
    const [showOptions, setShowOptions] = useState(false);

    const handleOptionClick = (option) => {
      onChange(option);
      setShowOptions(false);
    };

    return (
      <div className="dropdown-container">
        <label className="dropdown-label">{label}: </label>
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="dropdown-button"
        >
          {value}
        </button>
        {showOptions && (
          <ul className="dropdown-menu">
            {options.map((option) => (
              <li key={option} onClick={() => handleOptionClick(option)} className="dropdown-menu-item">
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <div className="app-container">
        <h1>Compute Engine Calculator</h1>
        <div>
          <Dropdown
            label="Field A"
            options={optionsA}
            value={fieldA}
            onChange={(value) => setFieldA(value)}
          />
        </div>
        <div>
          <Dropdown
            label="Field B"
            options={optionsB}
            value={fieldB}
            onChange={(value) => setFieldB(value)}
          />
        </div>
        <div>
          <Dropdown
            label="Field C"
            options={optionsC}
            value={fieldC}
            onChange={(value) => setFieldC(value)}
          />
        </div>
        <div className="input-container">
          <label className="input-label">CPU: </label>
          <input
            type="number"
            value={cpu}
            onChange={(e) => setCpu(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="input-container">
          <label className="input-label">Memory (GB): </label>
          <input
            type="number"
            value={memory}
            onChange={(e) => setMemory(e.target.value)}
            className="input-field"
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          Compute Engine Subtotal: ${subtotal.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default GcpCalculator;
