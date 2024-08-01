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
      const categoryData = data[category];
      if (!categoryData) return null; // Skip categories not present in the data

      // Track whether any product in this category has a non-zero value for the relevant costs
      let hasNonZeroProduct = false;

      const products = Object.keys(categoryData)
        .filter(product => product.startsWith('total')) // Filter for products starting with 'total'
        .map((product, productIndex) => {
          const productData = categoryData[product];
          if (!productData) return null; // Skip products not present in the data

          // Check if the product has any non-zero value for the relevant costs
          const hasNonZeroValue = Object.keys(productData).some(key => productData[key] !== 0);
          if (!hasNonZeroValue) return null; // Skip rendering this product if all values are zero

          // Mark that we have at least one non-zero product
          hasNonZeroProduct = true;

          return (
            <tr key={productIndex}>
              <td className="product-name">{product}</td> {/* Bold product name */}
              {Object.keys(productData).map((key, idx) => {
                const value = productData[key];
                return (
                  <td key={idx}>
                    {value !== undefined && value !== 0.0 ? `£${formatToTwoDecimals(value)}` : ''}
                  </td>
                );
              })}
            </tr>
          );
        });

      if (!hasNonZeroProduct) return null; // Skip this category if no products have non-zero values

      return (
        <div key={categoryIndex}>
          <h2 className="category-header">{category}</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Total Cost 1</th>
                <th>Total Cost 2</th>
                {/* Add more headers if necessary */}
              </tr>
            </thead>
            <tbody>
              {products}
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
