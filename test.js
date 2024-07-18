import React from 'react';
import InfoButton from './InfoButton';
import './Dropdown.css';

function Dropdown({ label, infoText, options, id, value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrapper">
        <select id={id} value={value} onChange={onChange}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
        <div className="info-button-container">
          <InfoButton text={infoText} />
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
