const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Chat inherits from Model
class Chat extends Model {}

// initialise Chat model
Chat.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		// user_a: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
		// 	references: {
		// 		model: 'user',
		// 		key: 'id'
		// 	},
		// },
		// user_b: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
		// 	references: {
		// 		model: 'user',
		// 		key: 'id'
		// 	},
		// },   -This can and will be handled by sequelize in index hasMany
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'chat',
	},
);

module.exports = Chat;
