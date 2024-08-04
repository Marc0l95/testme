import React, { useState, useEffect } from 'react';
import './ValuesContainer.css';

function ValuesContainer() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

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
                <td>{productData[key].cost_without_vat}</td>
                <td>{productData[key].cost_vat_rate}</td>
                <td>{productData[key].cost_incl_vat}</td>
                <td>{productData[key].cost_annual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="values-container">
      {data && (
        <>
          {renderTable(data.Compute.subproduct1, 'Compute')}
          {renderTable(data.Storage.subproduct1, 'Storage')}
        </>
      )}
    </div>
  );
}

export default ValuesContainer;
