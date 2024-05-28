require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.port || 3001;
const path = require('path');

//handlebars
const expressHandlebars = require('express-handlebars');
const handlebars = expressHandlebars.create({});

const routes = require('./controller');
// const helpers = require('./utils/helpers');

//handlebars
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(PORT, () => {
	console.log(`PopChat server listening in on http://localhost:${PORT}`);
});
