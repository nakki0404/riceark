import React from "react";
import { connect } from 'react-redux';
import Readying from "./Readying";
import Readying2 from "./Readying2";
import Readying3 from "./Readying3";
import Readying4 from "./Readying4";
import './Rospi.css'; // Import your CSS file
function Rospi(trade_datas) {
    return (
      <div className="calculator-container">
        <div className="sections-container">
      <div className="calculator-section">
          <Readying2 />
        </div>
        <div className="calculator-section">
        <Readying4 />
        <Readying />
        </div>
        <div className="calculator-section">
        <Readying3 />
        </div>
      </div>
      </div>
    );
  }


const mapStateToProps = (state) => ({
    trade_datas: state.trade_datas,
  });
  export default connect(mapStateToProps,)(Rospi);
