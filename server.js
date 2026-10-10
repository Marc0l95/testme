const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const hostname = '0.0.0.0';
const port = Number(process.env.PORT || 3000);
const backendHost = process.env.BACKEND_HOST || '127.0.0.1';
const backendPort = Number(process.env.BACKEND_PORT || 8000);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jsx': 'application/javascript; charset=utf-8',
  '.ts': 'application/javascript; charset=utf-8',
  '.tsx': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg'
};

const proxyRequest = (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const targetPath = `${requestUrl.pathname}${requestUrl.search || ''}`;

  const proxyRequestOptions = {
    hostname: backendHost,
    port: backendPort,
    path: targetPath,
    method: req.method,
    headers: {
      ...req.headers,
      host: `${backendHost}:${backendPort}`
    }
  };

  const backendReq = http.request(proxyRequestOptions, (backendRes) => {
    res.writeHead(backendRes.statusCode || 502, backendRes.headers);
    backendRes.pipe(res);
  });

  backendReq.on('error', () => {
    res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Backend unavailable', backend: `${backendHost}:${backendPort}` }));
  });

  req.pipe(backendReq);
};

const serveStaticFile = (req, res) => {
  const requestPath = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const filePath = path.join(__dirname, requestPath);

  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream'
    });
    res.end(data);
  });
};

const server = http.createServer((req, res) => {
  if (req.url && req.url.startsWith('/api')) {
    proxyRequest(req, res);
    return;
  }

  serveStaticFile(req, res);
});

server.listen(port, hostname, () => {
  console.log(`Frontend server running at http://${hostname}:${port}`);
  console.log(`API proxying to http://${backendHost}:${backendPort}`);
});
