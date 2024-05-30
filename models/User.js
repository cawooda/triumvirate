const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// User class inherits from Model
class User extends Model {
	// instance method to check login pw againset hashed pw in db
	async isCorrectPassword(inputPassword) {
		return await bcrypt.compare(inputPassword, this.password);
	}
}

// initialise User model
User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [8],
			},
		},
	},
	{
		// hooks to hash pw before creating or updating a user
		hooks: {
			beforeCreate: async (newUserData) => {
				newUserData.password = await bcrypt.hash(
					newUserData.password,
					10,
				);
				return newUserData;
			},
			beforeUpdate: async (updatedUserData) => {
				updatedUserData.password = await bcrypt.hash(
					updatedUserData.password,
					10,
				);
				return updatedUserData;
			},
		},
		sequelize,
		timestamps: false,
		freezeTableName: true,
		modelName: 'user',
	},
);

module.exports = User;
