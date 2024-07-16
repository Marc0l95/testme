import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css'; // Consolidated CSS file
import Dropdown from './Dropdown'; // Ensure correct path
import Banner from './Banner'; // Import the Banner component
import { resetAllFields } from './resetUtils'; // Import the reset utility function

function GcpCalculator() {
  const getInitialValue = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? storedValue : defaultValue;
  };

  const getInitialNumberValue = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? parseFloat(storedValue) : defaultValue;
  };

  const [fieldA, setFieldA] = useState(getInitialValue('fieldA', 'Option A1'));
  const [fieldB, setFieldB] = useState(getInitialValue('fieldB', 'Option B1'));
  const [fieldC, setFieldC] = useState(getInitialValue('fieldC', 'Option C1'));
  const [cpu, setCpu] = useState(getInitialNumberValue('cpu', ''));
  const [memory, setMemory] = useState(getInitialNumberValue('memory', ''));
  const [subtotal, setSubtotal] = useState(0);
  const [details, setDetails] = useState([]);

  const optionsA = ['Option A1', 'Option A2', 'Option A3'];
  const optionsB = ['Option B1', 'Option B2', 'Option B3'];
  const optionsC = ['Option C1', 'Option C2', 'Option C3'];

  useEffect(() => {
    calculateSubtotal();
  }, [fieldA, fieldB, fieldC, cpu, memory]);

  useEffect(() => {
    localStorage.setItem('fieldA', fieldA);
  }, [fieldA]);

  useEffect(() => {
    localStorage.setItem('fieldB', fieldB);
  }, [fieldB]);

  useEffect(() => {
    localStorage.setItem('fieldC', fieldC);
  }, [fieldC]);

  useEffect(() => {
    localStorage.setItem('cpu', cpu);
  }, [cpu]);

  useEffect(() => {
    localStorage.setItem('memory', memory);
  }, [memory]);

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
      const data = response.data;
      setSubtotal(data.cost);
      fetchDetails();
    } catch (error) {
      console.error("There was an error making the request:", error);
      setSubtotal(0);
    }
  };

  const handleCpuChange = (e) => {
    const value = e.target.value;
    setCpu(value === '' ? '' : parseFloat(value));
  };

  const handleMemoryChange = (e) => {
    const value = e.target.value;
    setMemory(value === '' ? '' : parseFloat(value));
  };

  const fetchDetails = async () => {
    try {
      const response = await axios.post('http://localhost:5000/detailed_calculate', {
        fieldA,
        fieldB,
        fieldC,
        cpu: parseFloat(cpu) || 0,
        memory: parseFloat(memory) || 0
      });
      const data = response.data;
      setDetails(data.items);
    } catch (error) {
      console.error("There was an error fetching the detailed costs:", error);
      setDetails([]);
    }
  };

  const handleReset = () => {
    resetAllFields(setFieldA, setFieldB, setFieldC, setCpu, setMemory);
    setSubtotal(0);
    setDetails([]);
  };

  return (
    <div className="App">
      <Banner onReset={handleReset} />
      <div className="app-container">
        <h1>Compute Engine Calculator</h1>
        <div className="input-section">
          <div className="input-fields">
            <Dropdown
              label="Field A"
              options={optionsA}
              value={fieldA}
              onChange={(value) => setFieldA(value)}
            />
            <Dropdown
              label="Field B"
              options={optionsB}
              value={fieldB}
              onChange={(value) => setFieldB(value)}
            />
            <Dropdown
              label="Field C"
              options={optionsC}
              value={fieldC}
              onChange={(value) => setFieldC(value)}
            />
            <div className="input-container">
              <label className="input-label">CPU: </label>
              <input
                type="number"
                value={cpu}
                onChange={handleCpuChange}
                className="input-field"
              />
            </div>
            <div className="input-container">
              <label className="input-label">Memory (GB): </label>
              <input
                type="number"
                value={memory}
                onChange={handleMemoryChange}
                className="input-field"
              />
            </div>
            <div className="subtotal">
              Compute Engine Subtotal: ${subtotal.toFixed(2)}
            </div>
          </div>
          <div className="details-box">
            <h2>Detailed Costs</h2>
            <table className="cost-table">
              <thead>
                <tr>
                  <th>Compute</th>
                  <th>Inputs</th>
                  <th>Cost 1</th>
                  <th>Cost 2</th>
                  <th>Cost 3</th>
                  <th>Cost 4</th>
                </tr>
              </thead>
              <tbody>
                {details.map((item, index) => (
                  <tr key={index}>
                    <td>{item.label}</td>
                    <td>{item.input}</td>
                    <td>${item.cost1.toFixed(2)}</td>
                    <td>${item.cost2.toFixed(2)}</td>
                    <td>${item.cost3.toFixed(2)}</td>
                    <td>${item.cost4.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="app-container">
        <h1>Detailed Costs Summary</h1>
        <div className="input-section">
          <div className="input-fields">
            {details.map((item, index) => (
              <div key={index} className="input-container">
                <label className="input-label">{item.label}: </label>
                <div className="input-field">
                  <p>Input: {item.input}</p>
                  <p>Cost 1: ${item.cost1.toFixed(2)}</p>
                  <p>Cost 2: ${item.cost2.toFixed(2)}</p>
                  <p>Cost 3: ${item.cost3.toFixed(2)}</p>
                  <p>Cost 4: ${item.cost4.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GcpCalculator;
