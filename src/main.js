const app = document.getElementById('app');

app.innerHTML = `
  <div class="page-shell">
    <div class="glow"></div>

    <main class="hero">
      <header class="nav">
        <div class="brand">
          <span class="brand-mark"></span>
          <span>GKE Cloud</span>
        </div>
        <div class="nav-links">
          <span>Platform</span>
          <span>Clusters</span>
          <span>Security</span>
          <span>Pricing</span>
        </div>
      </header>

      <section class="content">
        <div class="copy">
          <div class="eyebrow">Kubernetes orchestration</div>
          <h1>Launch <span class="accent">production-ready</span> GKE clusters.</h1>
          <p class="subtext">
            Build, scale, and manage resilient workloads with secure, enterprise-grade infrastructure built for modern cloud-native teams.
          </p>

          <div class="actions">
            <button class="btn btn-primary">Create a cluster</button>
            <button class="btn btn-secondary">View existing clusters</button>
          </div>

          <div class="metrics">
            <div class="metric">
              <strong>99.95%</strong>
              <span>Uptime SLA</span>
            </div>
            <div class="metric">
              <strong>2.4x</strong>
              <span>Faster setup</span>
            </div>
            <div class="metric">
              <strong>24/7</strong>
              <span>Monitoring</span>
            </div>
          </div>
        </div>

        <div class="visual">
          <div class="cluster-panel">
            <div class="panel-top">
              <div class="brand" style="font-size: 0.7rem; letter-spacing: 0.1em;">
                <span class="brand-mark"></span>
                <span>Cluster overview</span>
              </div>
              <div class="status">
                <span class="status-dot"></span>
                Healthy
              </div>
            </div>

            <div class="cluster-graph">
              <div class="node n1"></div>
              <div class="node n2"></div>
              <div class="node n3"></div>
              <div class="line l1"></div>
              <div class="line l2"></div>
            </div>

            <div class="panel-bottom">
              <div class="mini-card">
                <div class="label">Region</div>
                <strong>us-central1</strong>
              </div>
              <div class="mini-card">
                <div class="label">Nodes</div>
                <strong>12</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <section id="cluster-overview" class="cluster-section" aria-label="Existing clusters overview">
      <h2>Existing clusters</h2>
      <div class="cluster-list">
        <article class="cluster-card">
          <span class="tag">prod</span>
          <h3>production-east</h3>
          <p>Regional cluster with autoscaling, secure node pools, and 24/7 observability.</p>
        </article>

        <article class="cluster-card">
          <span class="tag">staging</span>
          <h3>staging-west</h3>
          <p>Pre-production environment tuned for rapid deployments and performance validation.</p>
        </article>

        <article class="cluster-card">
          <span class="tag">dev</span>
          <h3>dev-platform</h3>
          <p>Lightweight development cluster for experimentation, feature branches, and CI jobs.</p>
        </article>
      </div>
    </section>
  </div>
`;

const createBtn = document.querySelector('.btn-primary');
const viewBtn = document.querySelector('.btn-secondary');

if (createBtn) {
  createBtn.addEventListener('click', () => {
    createBtn.textContent = 'Cluster queued';
    createBtn.disabled = true;
    createBtn.style.opacity = '0.9';
  });
}

if (viewBtn) {
  viewBtn.addEventListener('click', () => {
    const clusterSection = document.getElementById('cluster-overview');
    clusterSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
