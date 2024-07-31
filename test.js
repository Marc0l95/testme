import React from 'react';
import { formatToTwoDecimals } from './utils';
import './DetailedCalculations.css';

function DetailedCalculations({ data }) {
  const renderTableData = (data) => {
    if (!data) return null;

    return Object.keys(data).map((category, index) => (
      <div key={index}>
        <h2 className="category-header">{category}</h2>
        {Object.keys(data[category]).map((product, productIndex) => {
          const productData = data[category][product];
          return (
            <div key={productIndex}>
              <h3>{product}</h3> {/* Product Heading */}
              <table>
                <thead>
                  <tr>
                    <th>Detail Key</th>
                    <th>Detail Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(productData).map(([key, value], idx) => {
                    if (value !== undefined && value !== null && value !== '') {
                      return (
                        <tr key={idx}>
                          <td>{key}</td>
                          <td>£{formatToTwoDecimals(value)}</td>
                        </tr>
                      );
                    }
                    return null; // Do not render if value is empty
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div className="detailed-calculations">
      <h1>Detailed Calculations Breakdown</h1>
      {renderTableData(data)}
    </div>
  );
}

export default DetailedCalculations;
