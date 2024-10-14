import React, { useState } from 'react';

const CustomInput = ({ value, onChange, className, minValue, maxValue, blockedMin, blockedMax, step }) => {
  const [inputValue, setInputValue] = useState(value);
  const [warning, setWarning] = useState('');

  const handleChange = (e) => {
    let newValue = parseInt(e.target.value, 10);

    // Allow empty input for user to delete and re-enter values
    if (isNaN(newValue)) {
      setInputValue('');
      onChange({ target: { value: '' } });
      setWarning('');
      return;
    }

    // Show warning if the value is within the blocked range
    if (newValue >= blockedMin && newValue <= blockedMax) {
      setWarning(`Warning: Value is between ${blockedMin} and ${blockedMax}`);
    } else {
      setWarning('');
    }

    // If the value is below minValue, set it to minValue
    if (newValue < minValue) {
      newValue = minValue;
    }

    // If the value is above maxValue, set it to maxValue
    if (maxValue !== undefined && newValue > maxValue) {
      newValue = maxValue;
    }

    setInputValue(newValue);
    onChange({ target: { value: newValue } });
  };

  return (
    <div className="input-with-validation">
      <input
        type="number"
        value={inputValue}
        onChange={handleChange}
        className={className}
        min={minValue}
        step={step}
      />
      {warning && <span className="warning-text">{warning}</span>}
    </div>
  );
};

export default CustomInput;
