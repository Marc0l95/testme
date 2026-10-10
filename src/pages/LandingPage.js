window.LandingPage = function LandingPage({ onCreateCluster, onViewClusters }) {
  return React.createElement(
    'div',
    { className: 'page-shell' },
    React.createElement('div', { className: 'glow' }),
    React.createElement(
      'main',
      { className: 'hero' },
      React.createElement(
        'header',
        { className: 'nav' },
        React.createElement(
          'div',
          { className: 'brand' },
          React.createElement('span', { className: 'brand-mark' }),
          React.createElement('span', null, 'GKE Cloud')
        ),
        React.createElement(
          'div',
          { className: 'nav-links' },
          React.createElement('span', null, 'Platform'),
          React.createElement('span', null, 'Clusters'),
          React.createElement('span', null, 'Security'),
          React.createElement('span', null, 'Pricing')
        )
      ),
      React.createElement(
        'section',
        { className: 'content' },
        React.createElement(
          'div',
          { className: 'copy' },
          React.createElement('div', { className: 'eyebrow' }, 'Kubernetes orchestration'),
          React.createElement(
            'h1',
            null,
            'Launch ',
            React.createElement('span', { className: 'accent' }, 'production-ready'),
            ' GKE clusters.'
          ),
          React.createElement(
            'p',
            { className: 'subtext' },
            'Build, scale, and manage resilient workloads with secure, enterprise-grade infrastructure built for modern cloud-native teams.'
          ),
          React.createElement(
            'div',
            { className: 'actions' },
            React.createElement(
              'button',
              { className: 'btn btn-primary', onClick: onCreateCluster },
              'Create a cluster'
            ),
            React.createElement(
              'button',
              { className: 'btn btn-secondary', onClick: onViewClusters },
              'View existing clusters'
            )
          ),
          React.createElement(
            'div',
            { className: 'metrics' },
            React.createElement(
              'div',
              { className: 'metric' },
              React.createElement('strong', null, '99.95%'),
              React.createElement('span', null, 'Uptime SLA')
            ),
            React.createElement(
              'div',
              { className: 'metric' },
              React.createElement('strong', null, '2.4x'),
              React.createElement('span', null, 'Faster setup')
            ),
            React.createElement(
              'div',
              { className: 'metric' },
              React.createElement('strong', null, '24/7'),
              React.createElement('span', null, 'Monitoring')
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'visual' },
          React.createElement(
            'div',
            { className: 'cluster-panel' },
            React.createElement(
              'div',
              { className: 'panel-top' },
              React.createElement(
                'div',
                { className: 'brand', style: { fontSize: '0.7rem', letterSpacing: '0.1em' } },
                React.createElement('span', { className: 'brand-mark' }),
                React.createElement('span', null, 'Cluster overview')
              ),
              React.createElement(
                'div',
                { className: 'status' },
                React.createElement('span', { className: 'status-dot' }),
                'Healthy'
              )
            ),
            React.createElement(
              'div',
              { className: 'cluster-graph' },
              React.createElement('div', { className: 'node n1' }),
              React.createElement('div', { className: 'node n2' }),
              React.createElement('div', { className: 'node n3' }),
              React.createElement('div', { className: 'line l1' }),
              React.createElement('div', { className: 'line l2' })
            ),
            React.createElement(
              'div',
              { className: 'panel-bottom' },
              React.createElement(
                'div',
                { className: 'mini-card' },
                React.createElement('div', { className: 'label' }, 'Region'),
                React.createElement('strong', null, 'us-central1')
              ),
              React.createElement(
                'div',
                { className: 'mini-card' },
                React.createElement('div', { className: 'label' }, 'Nodes'),
                React.createElement('strong', null, '12')
              )
            )
          )
        )
      )
    ),
    React.createElement(
      'section',
      { className: 'cluster-section', 'aria-label': 'Existing clusters overview' },
      React.createElement('h2', null, 'Existing clusters'),
      React.createElement(
        'div',
        { className: 'cluster-list' },
        React.createElement(
          'article',
          { className: 'cluster-card' },
          React.createElement('span', { className: 'tag' }, 'prod'),
          React.createElement('h3', null, 'production-east'),
          React.createElement(
            'p',
            null,
            'Regional cluster with autoscaling, secure node pools, and 24/7 observability.'
          )
        ),
        React.createElement(
          'article',
          { className: 'cluster-card' },
          React.createElement('span', { className: 'tag' }, 'staging'),
          React.createElement('h3', null, 'staging-west'),
          React.createElement(
            'p',
            null,
            'Pre-production environment tuned for rapid deployments and performance validation.'
          )
        ),
        React.createElement(
          'article',
          { className: 'cluster-card' },
          React.createElement('span', { className: 'tag' }, 'dev'),
          React.createElement('h3', null, 'dev-platform'),
          React.createElement(
            'p',
            null,
            'Lightweight development cluster for experimentation, feature branches, and CI jobs.'
          )
        )
      )
    )
  );
};
