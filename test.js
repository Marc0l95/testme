import React from 'react';
import './Dropdown.css';

function Dropdown({ label, infoText, options, id, value, onChange }) {
  return (
    <div className="dropdown-container">
      <label htmlFor={id}>{label}</label>
      <div className="dropdown-wrapper">
        <select id={id} value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Dropdown;
