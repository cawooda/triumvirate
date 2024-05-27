const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Message inherits from Model
class Message extends Model {}

// initialise Message model
Message.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		date_created: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		from_user: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'user',
				key: 'id'
			},
		},
		to_user: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'user',
				key: 'id'
			},
		},
		chat_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'chat',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'message',
	}
);

module.exports = Message;