// Calculator.js
import React from 'react';
import MyComponent from './components/MyComponent';
// import TopNavigationBar from './components/UI/TopNavigationBar';
// <TopNavigationBar />

import Valuelistviewer from './components/Valuelistviewer';
import Poplist from './components/Poplist';
import './Calculator.css'; // Import your CSS file
const Calculator = () => {
  return (
    
      <div className="calculator-container">
        <div className="sections-container">
      <div className="calculator-section">
          <MyComponent />
        </div>
        <div className="calculator-section">
          <Valuelistviewer />
        </div>
        <div className="calculator-section">
          <Poplist />
        </div>
        </div>
      </div>
    
  );
};

export default Calculator;
