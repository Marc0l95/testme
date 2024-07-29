import React from 'react';
import './ValuesContainer.css';
import InfoBox from './InfoBox';

function ValuesContainer({ data }) {
  const renderTableData = (data) => {
    const rows = [];

    if (data) {
      Object.keys(data).forEach((product) => {
        if (product.startsWith('total_')) {
          const productData = data[product];
          const row = {
            name: product,
            totals: [],
          };

          Object.keys(productData).forEach((key) => {
            row.totals.push({ key, value: productData[key] });
          });

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

  return (
    <div className="values-container">
      <h2>Summary</h2>
      {renderTableData(data)}
      <InfoBox title="Info 1" content="This is an example info box with some text." />
      <InfoBox title="Info 2" content="Another info box with more information." />
      <InfoBox title="Info 3" content={<img src="/path/to/image.png" alt="Example" />} />
      <InfoBox title="Info 4" content={<a href="https://example.com">Example Link</a>} />
    </div>
  );
}

export default ValuesContainer;
