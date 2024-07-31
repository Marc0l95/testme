import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatToTwoDecimals } from './utils';
import './ValuesContainer.css';

function ValuesContainer({ data }) {
  const navigate = useNavigate();

  // Define the desired order of categories explicitly
  const categoryOrder = ['compute', 'storage'];

  const renderTableData = (data) => {
    if (!data) return null;

    return categoryOrder.map((category, categoryIndex) => {
      if (!data[category]) return null; // Skip categories not present in the data

      return (
        <div key={categoryIndex}>
          <h2 className="category-header">{category}</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Total Cost 1</th>
                <th>Total Cost 2</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data[category])
                .filter(product => product.startsWith('total')) // Filter for products starting with 'total'
                .map((product, productIndex) => {
                  const productData = data[category][product];
                  if (!productData) return null; // Skip products not present in the data

                  const hasNonZeroValue = ['total_cost1', 'total_cost2'].some(
                    (key) => productData[key] !== undefined && productData[key] !== 0.0
                  );

                  if (!hasNonZeroValue) {
                    return null; // Do not render the row if all values are 0.0 or undefined
                  }

                  return (
                    <tr key={productIndex}>
                      <td>{product}</td>
                      {['total_cost1', 'total_cost2'].map((key, idx) => {
                        const value = productData[key];
                        return (
                          <td key={idx}>
                            {value !== undefined && value !== 0.0 ? `£${formatToTwoDecimals(value)}` : ''}
                          </td>
                        );
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
    <div className="values-container">
      <div className="spacer"></div> {/* Spacer element */}
      <div className="toggle-container">
        <button onClick={() => navigate('/app')} className="toggle-button">
          Back to Calculator
        </button>
      </div>
      <h1>Totals Summary</h1>
      {renderTableData(data)}
    </div>
  );
}

export default ValuesContainer;
