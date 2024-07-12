from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Maps for translating labels to numerical values
fieldA_map = {
    'Option A1': 1,
    'Option A2': 2,
    'Option A3': 3
}

fieldB_map = {
    'Option B1': 1,
    'Option B2': 2,
    'Option B3': 3
}

fieldC_map = {
    'Option C1': 1,
    'Option C2': 2,
    'Option C3': 3
}

@app.route('/calculate', methods=['POST'])
def calculate_cost():
    data = request.get_json()
    
    # Translate fields to numerical values
    fieldA = fieldA_map.get(data.get('fieldA', ''), 0)
    fieldB = fieldB_map.get(data.get('fieldB', ''), 0)
    fieldC = fieldC_map.get(data.get('fieldC', ''), 0)
    
    cpu = data.get('cpu', 0)
    memory = data.get('memory', 0)
    
    # Pricing details (mocked)
    cpu_cost_per_hour = 0.033
    memory_cost_per_hour = 0.004
    
    # Compute costs
    field_cost = fieldA + fieldB + fieldC
    compute_cost = (cpu * cpu_cost_per_hour + memory * memory_cost_per_hour)
    total_cost = field_cost + compute_cost

    # Additional columns calculations
    cost1 = total_cost * 0.1
    vat_rate = 0.2  # Example VAT rate of 20%
    cost2 = total_cost * vat_rate
    cost3 = cost1 + cost2
    cost4 = cost3 * 12
    
    # Constructing item costs for the response
    items = [
        {
            'label': 'How many clusters',
            'input': cpu,
            'cost1': cost1,
            'cost2': cost2,
            'cost3': cost3,
            'cost4': cost4
        },
        {
            'label': 'Size of nodes',
            'input': memory,
            'cost1': cost1 * 2,
            'cost2': cost2 * 2,
            'cost3': cost3 * 2,
            'cost4': cost4 * 2
        }
        # Add more items as necessary
    ]
    
    return jsonify({
        'cost': total_cost,
        'items': items
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
