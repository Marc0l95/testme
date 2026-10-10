window.ClusterCreationPage = function ClusterCreationPage({ form, onBack }) {
  const steps = [
    { title: 'Validate config', status: 'complete', detail: 'Policy checks passed' },
    { title: 'Provision network', status: 'active', detail: 'Subnet and firewall setup' },
    { title: 'Create control plane', status: 'pending', detail: 'Control plane initialization' },
    { title: 'Bootstrap worker nodes', status: 'pending', detail: 'Node pool creation' },
    { title: 'Finalize cluster', status: 'pending', detail: 'Service deployment' }
  ];

  const clusterTitle = form.clusterName || 'production-cluster';

  return React.createElement(
    'div',
    { className: 'page-shell' },
    React.createElement('div', { className: 'glow' }),
    React.createElement(
      'main',
      { className: 'page-card creation-page' },
      React.createElement(
        'header',
        { className: 'nav' },
        React.createElement(
          'div',
          { className: 'brand' },
          React.createElement('span', { className: 'brand-mark' }),
          React.createElement('span', null, 'Cluster creation')
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
        React.createElement(
          'div',
          { className: 'creation-header' },
          React.createElement(
            'div',
            null,
            React.createElement('div', { className: 'eyebrow' }, 'Deployment status'),
            React.createElement(
              'h2',
              null,
              'Creating ',
              React.createElement('span', { className: 'accent' }, clusterTitle)
            )
          ),
          React.createElement(
            'div',
            { className: 'status-pill' },
            React.createElement('span', { className: 'status-dot' }),
            'In progress'
          )
        ),
        React.createElement(
          'div',
          { className: 'creation-graph' },
          steps.map((step, index) =>
            React.createElement(
              'div',
              { key: step.title, className: 'graph-node-group' },
              React.createElement(
                'div',
                { className: 'graph-node ' + step.status },
                React.createElement('span', null, index + 1)
              ),
              React.createElement(
                'div',
                { className: 'graph-copy' },
                React.createElement('strong', null, step.title),
                React.createElement('small', null, step.detail)
              ),
              index < steps.length - 1 ? React.createElement('div', { className: 'graph-line' }) : null
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'summary-grid' },
          React.createElement(
            'div',
            { className: 'summary-box' },
            React.createElement('span', { className: 'label' }, 'Region'),
            React.createElement('strong', null, form.region)
          ),
          React.createElement(
            'div',
            { className: 'summary-box' },
            React.createElement('span', { className: 'label' }, 'Nodes'),
            React.createElement('strong', null, form.nodeCount)
          ),
          React.createElement(
            'div',
            { className: 'summary-box' },
            React.createElement('span', { className: 'label' }, 'Version'),
            React.createElement('strong', null, form.version)
          ),
          React.createElement(
            'div',
            { className: 'summary-box' },
            React.createElement('span', { className: 'label' }, 'Tier'),
            React.createElement('strong', null, form.environment)
          )
        )
      )
    )
  );
};
