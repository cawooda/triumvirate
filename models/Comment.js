const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Comment inherits from Model
class Comment extends Model {
	// instance method to increment likes
	incLikes() {
		this.likes++;
	}
	// instance method to decrement likes
	decLikes() {
		this.likes--;
	}
}

// initialise Comment model
Comment.init(
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
		likes: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id',
			},
		},
		post_id: {
			type: DataTypes.INTEGER,
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
		modelName: 'comment',
	},
);

module.exports = Comment;
