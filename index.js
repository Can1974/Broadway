const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const proxyTargets = {
  'm04.mecusto.de': '/page/toolu_01SoaJKk282FdspkNJeJWxaW/stadtwerke_kundenkommunikation.html',
  'm05.mecusto.de': '/page/toolu_ABCXYZ123/stadtwerke_energieberater.html'
};

app.use((req, res, next) => {
  const host = req.headers.host;
  const targetPath = proxyTargets[host];

  if (!targetPath) {
    return res.status(404).send('Keine passende Demo konfiguriert.');
  }

  createProxyMiddleware({
    target: 'https://page.genspark.site',
    changeOrigin: true,
    pathRewrite: {
      '^/': targetPath,
    },
  })(req, res, next);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy läuft auf Port ${PORT}`);
});
