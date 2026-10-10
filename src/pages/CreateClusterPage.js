window.CreateClusterPage = function CreateClusterPage({ form, onChange, onSubmit, onBack }) {
  return React.createElement(
    'div',
    { className: 'page-shell' },
    React.createElement('div', { className: 'glow' }),
    React.createElement(
      'main',
      { className: 'page-card form-page' },
      React.createElement(
        'header',
        { className: 'nav' },
        React.createElement(
          'div',
          { className: 'brand' },
          React.createElement('span', { className: 'brand-mark' }),
          React.createElement('span', null, 'Create cluster')
        ),
        React.createElement(
          'button',
          { className: 'secondary-link', onClick: onBack },
          'Back'
        )
      ),
      React.createElement(
        'section',
        { className: 'stacked-panel' },
        React.createElement('div', { className: 'eyebrow' }, 'Provisioning setup'),
        React.createElement('h2', null, 'Configure your GKE cluster'),
        React.createElement(
          'p',
          { className: 'subtext compact' },
          'Define the deployment profile for your Kubernetes environment and start the cluster creation workflow.'
        ),
        React.createElement(
          'div',
          { className: 'form-grid' },
          React.createElement(
            'label',
            { className: 'field' },
            React.createElement('span', null, 'Cluster name'),
            React.createElement('input', {
              type: 'text',
              value: form.clusterName,
              onChange: (event) => onChange('clusterName', event.target.value),
              placeholder: 'production-cluster'
            })
          ),
          React.createElement(
            'label',
            { className: 'field' },
            React.createElement('span', null, 'Region'),
            React.createElement(
              'select',
              { value: form.region, onChange: (event) => onChange('region', event.target.value) },
              React.createElement('option', { value: 'us-central1' }, 'us-central1'),
              React.createElement('option', { value: 'us-east1' }, 'us-east1'),
              React.createElement('option', { value: 'europe-west1' }, 'europe-west1'),
              React.createElement('option', { value: 'asia-southeast1' }, 'asia-southeast1')
            )
          ),
          React.createElement(
            'label',
            { className: 'field' },
            React.createElement('span', null, 'Environment'),
            React.createElement(
              'select',
              { value: form.environment, onChange: (event) => onChange('environment', event.target.value) },
              React.createElement('option', { value: 'production' }, 'Production'),
              React.createElement('option', { value: 'staging' }, 'Staging'),
              React.createElement('option', { value: 'development' }, 'Development')
            )
          ),
          React.createElement(
            'label',
            { className: 'field' },
            React.createElement('span', null, 'Node count'),
            React.createElement('input', {
              type: 'number',
              min: '1',
              max: '50',
              value: form.nodeCount,
              onChange: (event) => onChange('nodeCount', event.target.value)
            })
          ),
          React.createElement(
            'label',
            { className: 'field' },
            React.createElement('span', null, 'Kubernetes version'),
            React.createElement(
              'select',
              { value: form.version, onChange: (event) => onChange('version', event.target.value) },
              React.createElement('option', { value: '1.30' }, '1.30'),
              React.createElement('option', { value: '1.29' }, '1.29'),
              React.createElement('option', { value: '1.28' }, '1.28')
            )
          ),
          React.createElement(
            'label',
            { className: 'field' },
            React.createElement('span', null, 'Machine type'),
            React.createElement(
              'select',
              { value: form.machineType, onChange: (event) => onChange('machineType', event.target.value) },
              React.createElement('option', { value: 'e2-standard-4' }, 'e2-standard-4'),
              React.createElement('option', { value: 'e2-standard-8' }, 'e2-standard-8'),
              React.createElement('option', { value: 'c3-standard-8' }, 'c3-standard-8')
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'actions action-row' },
          React.createElement(
            'button',
            { className: 'btn btn-secondary', onClick: onBack },
            'Cancel'
          ),
          React.createElement(
            'button',
            { className: 'btn btn-primary', onClick: onSubmit },
            'Start cluster creation'
          )
        )
      )
    )
  );
};
