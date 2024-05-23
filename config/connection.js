// import sequelize library
const Sequelize = require('sequelize');

let sequelize;

// if app is deployed on render construct using the DB_URL env variable
// else use env variables from .env
if (process.env.DB_URL) {
	sequelize = new Sequelize(process.env.DB_URL);
} else {
	sequelize = new Sequelize(
		process.env.DB_NAME,
		process.env.DB_USER,
		process.env.DB_PASSWORD,
		{
			host: 'localhost',
			dialect: 'postgres'
		}
	);
}

module.exports = sequelize;