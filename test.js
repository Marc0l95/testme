import React from 'react';
import './ValuesContainer.css';

function ValuesContainer({ data }) {
  const roundToTwoDecimals = (value) => {
    return parseFloat(value).toFixed(2);
  };

  const renderTable = (productData, productName) => {
    const totalKeys = Object.keys(productData).filter(key => key.startsWith('total'));

    if (totalKeys.length === 0) {
      return null;
    }

    return (
      <div key={productName} className="product-table">
        <h3>{productName}</h3>
        <table>
          <thead>
            <tr>
              <th>Value 1</th>
              <th>Value 2</th>
              <th>Value 3</th>
              <th>Value 4</th>
            </tr>
          </thead>
          <tbody>
            {totalKeys.map(key => (
              <tr key={key}>
                <td>{roundToTwoDecimals(productData[key].cost_without_vat)}</td>
                <td>{roundToTwoDecimals(productData[key].cost_vat_rate)}</td>
                <td>{roundToTwoDecimals(productData[key].cost_incl_vat)}</td>
                <td>{roundToTwoDecimals(productData[key].cost_annual)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const productOrder = [
    { key: 'Compute', name: 'Compute' },
    { key: 'Storage', name: 'Storage' }
  ];

  return (
    <div className="values-container">
      {data && (
        <>
          {productOrder.map(product => 
            data[product.key] && renderTable(data[product.key].subproduct1, product.name)
          )}
        </>
      )}
    </div>
  );
}

export default ValuesContainer;
