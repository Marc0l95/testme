import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function GcpCalculator() {
  const [fieldA, setFieldA] = useState('Option A1');
  const [fieldB, setFieldB] = useState('Option B1');
  const [fieldC, setFieldC] = useState('Option C1');
  const [cpu, setCpu] = useState('');
  const [memory, setMemory] = useState('');
  const [costs, setCosts] = useState({
    subtotal: 0,
    items: []
  });

  const optionsA = ['Option A1', 'Option A2', 'Option A3'];
  const optionsB = ['Option B1', 'Option B2', 'Option B3'];
  const optionsC = ['Option C1', 'Option C2', 'Option C3'];

  useEffect(() => {
    calculateCosts();
  }, [fieldA, fieldB, fieldC, cpu, memory]);

  const calculateCosts = async () => {
    if (!cpu && !memory) {
      setCosts({
        subtotal: 0,
        items: []
      });
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
      setCosts({
        subtotal: data.cost,
        items: [
          { label: 'How many clusters', input: cpu, cost1: data.cost1, cost2: data.cost2, cost3: data.cost3, cost4: data.cost4 },
          { label: 'Size of nodes', input: memory, cost1: data.cost1 * 2, cost2: data.cost2 * 2, cost3: data.cost3 * 2, cost4: data.cost4 * 2 }
          // Add more items as necessary
        ]
      });
    } catch (error) {
      console.error("There was an error making the request:", error);
      setCosts({
        subtotal: 0,
        items: []
      });
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

const Dropdown = ({ label, options, value, onChange }) => {
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionClick = (option) => {
    onChange(option);
    setShowOptions(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <label className="dropdown-label">{label}: </label>
      <div style={{ position: 'relative' }}>
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
            {costs.items.map((item, index) => (
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
          <tfoot>
            <tr>
              <td colSpan="5">Subtotal</td>
              <td>${costs.subtotal.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default GcpCalculator;
