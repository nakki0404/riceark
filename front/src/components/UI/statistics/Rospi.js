import React from "react";
import PartialTotal from "./PartialTotal";
import SelectGraph from "./SelectGraph";
import Total from "./Total";
import ListTable from "./ListTable";
import "./Rospi.css"; // Import your CSS file
function Rospi() {
  return (
    <div className="calculator-container">
      <div className="sections-container">
        <div className="calculator-section5">
          <SelectGraph />
        </div>
        <div className="calculator-section5">
          <Total />
          <PartialTotal />
        </div>
        <div className="calculator-section5">
          <ListTable />
        </div>
      </div>
    </div>
  );
}

export default Rospi;
