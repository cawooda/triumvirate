const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Post inherits from Model
class Post extends Model {
	// instance method to increment views
	incViews() {
		this.views++;
	};
	// instance method to increment likes
	incLikes() {
		this.likes++;
	};
	// instance method to decrement likes
	decLikes() {
		this.likes--;
	};
}

// initialise Post model
Post.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
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
		views: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
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
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		modelName: 'post',
	}
);

module.exports = Post;