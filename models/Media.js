const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Media inherits from Model
class Media extends Model {}

// initialise Media model
Media.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		filename: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		original_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		mimetype: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		path: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		size: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		post_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'post',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'media',
	}
);

module.exports = Media;