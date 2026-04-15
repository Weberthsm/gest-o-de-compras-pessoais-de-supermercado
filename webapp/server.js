const express = require('express');
const path = require('path');
const { APP_PORT, API_BASE_URL } = require('./config');

const app = express();
const publicFolder = path.join(__dirname, 'public');

app.use(express.static(publicFolder));

app.get('/app-config.js', (req, res) => {
  res.type('application/javascript');
  res.send(`window.APP_CONFIG = ${JSON.stringify({ API_BASE_URL })};`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(publicFolder, 'index.html'));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(publicFolder, 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro interno do servidor.');
});

app.listen(APP_PORT, () => {
  console.log(`Aplicação web rodando em http://localhost:${APP_PORT}`);
});

module.exports = app;
