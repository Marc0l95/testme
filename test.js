import React from 'react';
import Navbar from './Navbar';
import InputContainer from './InputContainer';
import ValuesContainer from './ValuesContainer';
import './MainApp.css';

function MainApp() {
  return (
    <div className="MainApp">
      <Navbar />
      <div className="container">
        <InputContainer />
        <ValuesContainer />
      </div>
    </div>
  );
}

export default MainApp;
