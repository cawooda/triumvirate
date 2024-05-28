require('dotenv');

const express = require('express');
const app = express();
const PORT = process.env.port || 3001;
const path = require('path');

const routes = require('./controller');
// const helpers = require('./utils/helpers');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(PORT, () => {
  console.log(`PopChat server listening in on http://localhost:${PORT}`)
})