import React from 'react';
import { formatToTwoDecimals } from './utils';
import './DetailedCalculations.css';

function DetailedCalculations({ data }) {
  // Define the order of the categories explicitly
  const categoryOrder = ['compute', 'storage'];

  const renderTableData = (data) => {
    if (!data) return null;

    return categoryOrder.map((category, categoryIndex) => {
      // Skip categories not present in the data
      if (!data[category]) return null;

      return (
        <div key={categoryIndex}>
          <h2 className="category-header">{category}</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Cost 1</th>
                <th>Cost 2</th>
                <th>Cost 3</th>
                <th>Detail 1</th>
                <th>Detail 2</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data[category]).map((product, productIndex) => {
                const productData = data[category][product];
                return (
                  <tr key={productIndex}>
                    <td>{product}</td>
                    {['cost1', 'cost2', 'cost3', 'detail1', 'detail2'].map((key, idx) => {
                      const value = productData[key];
                      if (value !== undefined && value !== null && value !== 0.0) {
                        return <td key={idx}>{`£${formatToTwoDecimals(value)}`}</td>;
                      }
                      return <td key={idx}></td>; // Render an empty cell for 0.0 values
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    });
  };

  return (
    <div className="detailed-calculations">
      <h1>Detailed Calculations Breakdown</h1>
      {renderTableData(data)}
    </div>
  );
}

export default DetailedCalculations;
