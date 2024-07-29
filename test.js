import React from 'react';
import './ValuesContainer.css';
import InfoBox from './InfoBox';

function ValuesContainer({ data }) {
  const renderTableData = (data) => {
    const rows = [];

    if (data) {
      Object.keys(data).forEach((product) => {
        const productData = data[product];
        const row = {
          name: productData.name,
          totals: [],
        };

        Object.keys(productData).forEach((key) => {
          if (key.startsWith('total_')) {
            row.totals.push({ key, value: productData[key] });
          }
        });

        if (row.totals.length > 0) {
          rows.push(row);
        }
      });
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Total Key</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <React.Fragment key={index}>
              {row.totals.map((total, idx) => (
                <tr key={idx}>
                  {idx === 0 && <td rowSpan={row.totals.length}>{row.name}</td>}
                  <td>{total.key}</td>
                  <td>{total.value}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  };

  // Example subtotals and overall total
  const subtotal1 = data ? data.product1.calc1 + data.product1.calc2 : 0;
  const subtotal2 = data ? data.product2.calc1 + data.product2.calc2 : 0;
  const overallTotal = subtotal1 + subtotal2;

  return (
    <div className="values-container">
      <h2>Summary</h2>
      <div className="subtotal">
        <h3>Subtotal 1: {subtotal1}</h3>
      </div>
      <div className="subtotal">
        <h3>Subtotal 2: {subtotal2}</h3>
      </div>
      <div className="overall-total">
        <h3>Overall Total: {overallTotal}</h3>
      </div>
      {renderTableData(data)}
      <InfoBox title="Info 1" content="This is an example info box with some text." />
      <InfoBox title="Info 2" content="Another info box with more information." />
      <InfoBox title="Info 3" content={<img src="/path/to/image.png" alt="Example" />} />
      <InfoBox title="Info 4" content={<a href="https://example.com">Example Link</a>} />
    </div>
  );
}

export default ValuesContainer;
