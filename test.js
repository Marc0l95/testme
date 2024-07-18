import React from 'react';
import './ValuesContainer.css';

function ValuesContainer() {
  return (
    <div className="values-container">
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
          {/* API data will be populated here */}
        </tbody>
      </table>
    </div>
  );
}

export default ValuesContainer;
