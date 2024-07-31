import React from 'react';
import { formatToTwoDecimals } from './utils';
import './DetailedCalculations.css';

function DetailedCalculations({ data }) {
  const renderTableData = (data) => {
    if (!data) return null;

    return Object.keys(data).map((category, categoryIndex) => (
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
                  <td>{productData.cost1 !== undefined && productData.cost1 !== null ? `£${formatToTwoDecimals(productData.cost1)}` : ''}</td>
                  <td>{productData.cost2 !== undefined && productData.cost2 !== null ? `£${formatToTwoDecimals(productData.cost2)}` : ''}</td>
                  <td>{productData.cost3 !== undefined && productData.cost3 !== null ? `£${formatToTwoDecimals(productData.cost3)}` : ''}</td>
                  <td>{productData.detail1 !== undefined && productData.detail1 !== null ? `£${formatToTwoDecimals(productData.detail1)}` : ''}</td>
                  <td>{productData.detail2 !== undefined && productData.detail2 !== null ? `£${formatToTwoDecimals(productData.detail2)}` : ''}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
