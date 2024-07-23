import React from 'react';
import './DetailedCalculations.css';

function DetailedCalculations({ data }) {
  // Assuming `data` is passed down from a parent component or fetched from an API
  // Here, just a static example
  const exampleData = {
    product1: [
      { cost1: 4.00, description: "Input1 + Input2 + Dropdown1" },
      { cost2: 6.00, description: "Input1 - Input2 + Dropdown2" }
    ],
    product2: [
      { cost3: 12.00, description: "Input1 * Input2 * Dropdown3" },
      { cost4: 15.00, description: "(Input1 + Input2) / (Dropdown1 + 1)" }
    ]
  };

  const renderTableData = (data) => {
    return Object.keys(data).map((product, index) => (
      <div key={index}>
        <h3>{product}</h3>
        <table>
          <thead>
            <tr>
              <th>Cost</th>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data[product].map((item, idx) => (
              <tr key={idx}>
                {Object.keys(item).map((key, i) => (
                  <td key={i}>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ));
  };

  return (
    <div className="detailed-calculations">
      <h2>Detailed Calculations Breakdown</h2>
      {renderTableData(exampleData)}
    </div>
  );
}

export default DetailedCalculations;
