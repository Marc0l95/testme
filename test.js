import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ValuesContainer.css';
import InfoBox from './InfoBox';

function ValuesContainer({ data }) {
  const [valuesData, setValuesData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/values', data);
        setValuesData(response.data);
      } catch (error) {
        console.error('Error fetching values data:', error);
      }
    };

    fetchData();
  }, [data]);

  const renderTableData = (data) => {
    const rows = [];

    if (data) {
      Object.keys(data).forEach((key) => {
        if (key.startsWith('total_')) {
          const totalData = data[key];
          Object.keys(totalData).forEach((totalKey) => {
            rows.push({ product: key, totalKey, totalValue: totalData[totalKey] });
          });
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
            <tr key={index}>
              <td>{row.product}</td>
              <td>{row.totalKey}</td>
              <td>{row.totalValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="values-container">
      <h2>Summary</h2>
      {valuesData && renderTableData(valuesData)}
      <InfoBox title="Info 1" content="This is an example info box with some text." />
      <InfoBox title="Info 2" content="Another info box with more information." />
      <InfoBox title="Info 3" content={<img src="/path/to/image.png" alt="Example" />} />
      <InfoBox title="Info 4" content={<a href="https://example.com">Example Link</a>} />
    </div>
  );
}

export default ValuesContainer;
