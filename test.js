const DynamicTable = ({ data }) => {
  const flattenData = (obj, prefix = '') => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (typeof value === 'object' && value !== null) {
        return { ...acc, ...flattenData(value, `${prefix}${key}.`) };
      }
      return { ...acc, [`${prefix}${key}`]: value };
    }, {});
  };

  const filteredData = Object.entries(flattenData(data))
    .filter(([key]) => key.startsWith('total'))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  const groupedData = Object.entries(filteredData).reduce((acc, [key, value]) => {
    const [category, product, metric] = key.split('.');
    if (!acc[product]) acc[product] = {};
    acc[product][metric] = value;
    return acc;
  }, {});

  const nonZeroProducts = Object.entries(groupedData).filter(([_, values]) => 
    Object.values(values).some(value => value !== 0)
  );

  if (nonZeroProducts.length === 0) return null;

  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Total Cost 1</th>
          <th>Total Cost 2</th>
        </tr>
      </thead>
      <tbody>
        {nonZeroProducts.map(([product, values]) => (
          <tr key={product}>
            <td>{product}</td>
            <td>{values.total_cost1}</td>
            <td>{values.total_cost2}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Usage
const App = () => {
  const jsonData = {
    "compute": {
      "total_product1": { "total_cost1": 120.0, "total_cost2": 110.0, "other_metric": 50.0 },
      "total_product2": { "total_cost1": 0.0, "total_cost2": 0.0, "other_metric": 0.0 }
    },
    "storage": {
      "total_product3": { "total_cost1": 150.0, "total_cost2": 140.0, "other_metric": 60.0 },
      "total_product4": { "total_cost1": 0.0, "total_cost2": 0.0, "other_metric": 0.0 }
    }
  };

  return (
    <div>
      <h1>Product Totals</h1>
      <DynamicTable data={jsonData} />
    </div>
  );
};
