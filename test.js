import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Dropdown from './Dropdown'; // Ensure correct path

function GcpCalculator() {
  const [fieldA, setFieldA] = useState('Option A1');
  const [fieldB, setFieldB] = useState('Option B1');
  const [fieldC, setFieldC] = useState('Option C1');
  const [cpu, setCpu] = useState('');
  const [memory, setMemory] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [details, setDetails] = useState([]);

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

  return (
    <div className="App">
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
    </div>
  );
}

export default GcpCalculator;
