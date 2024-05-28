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
		user_a: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'user',
				key: 'id',
			},
		},
		user_b: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'user',
				key: 'id',
			},
		},
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
