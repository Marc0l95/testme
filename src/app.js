const { useState, useEffect } = React;

const ROUTES = {
  '/': 'landing',
  '/create-cluster': 'form',
  '/cluster-creation': 'creation'
};

const routeMap = {
  landing: '/',
  form: '/create-cluster',
  creation: '/cluster-creation'
};

const getCurrentRoute = () => {
  const hash = window.location.hash || '#/';
  const path = hash.startsWith('#') ? hash.slice(1) : hash;
  return ROUTES[path] || 'landing';
};

const navigate = (page) => {
  const targetPath = routeMap[page] || '/';
  window.location.hash = `#${targetPath}`;
};

const initialForm = {
  clusterName: 'production-cluster',
  region: 'us-central1',
  environment: 'production',
  nodeCount: '3',
  version: '1.30',
  machineType: 'e2-standard-4'
};

function App() {
  const [page, setPage] = useState(getCurrentRoute());
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    const syncRoute = () => setPage(getCurrentRoute());
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  };

  if (page === 'landing') {
    return React.createElement(window.LandingPage, {
      onCreateCluster: () => navigate('form'),
      onViewClusters: () => navigate('landing')
    });
  }

  if (page === 'form') {
    return React.createElement(window.CreateClusterPage, {
      form,
      onChange: updateForm,
      onSubmit: () => navigate('creation'),
      onBack: () => navigate('landing')
    });
  }

  return React.createElement(window.ClusterCreationPage, {
    form,
    onBack: () => navigate('form')
  });
}

if (!window.location.hash) {
  window.location.hash = '#/';
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(React.createElement(App));
