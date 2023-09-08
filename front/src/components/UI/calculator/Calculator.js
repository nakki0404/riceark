// Calculator.js
import React from "react";
import MyComponent from "./MyComponent";
// import TopNavigationBar from './components/UI/TopNavigationBar';
// <TopNavigationBar />

import Valuelistviewer from "./Valuelistviewer";
import Poplist from "./Poplist";
import "./Calculator.css"; // Import your CSS file
const Calculator = () => {
  return (
    <div>
      <div className="sections-container2">
        <div className="calculator-section2">
          <MyComponent />
        </div>
        <div className="calculator-section2">
          <Valuelistviewer />
        </div>
        <div className="calculator-section2">
          <Poplist />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
