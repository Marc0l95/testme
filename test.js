import React from 'react';
import InfoButton from './InfoButton';
import Dropdown from './Dropdown';
import './InputContainer.css';

function InputContainer() {
  return (
    <div className="input-container">
      <form>
        <div className="form-group">
          <label htmlFor="input1">A Very Long Label for Input 1 That Should Be Visible</label>
          <div className="input-wrapper">
            <input type="text" id="input1" />
            <div className="info-button-container">
              <InfoButton text="This is some information about Input 1." />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="input2">Input 2</label>
          <div className="input-wrapper">
            <input type="text" id="input2" />
            <div className="info-button-container">
              <InfoButton text="This is some information about Input 1." />
            </div>
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
        />
      </form>
    </div>
  );
}

export default InputContainer;
