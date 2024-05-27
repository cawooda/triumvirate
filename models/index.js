const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// one-to-many relationship between User and Post
User.hasMany(Post, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});
Post.belongsTo(User, {
	foreignKey: 'user_id',
});

// one-to-many relationship between User and Comment
User.hasMany(Comment, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});
Comment.belongsTo(User, {
	foreignKey: 'user_id',
});

// one-to-many relationship between Post and Comment
Post.hasMany(Comment, {
	foreignKey: 'post_id',
	onDelete: 'CASCADE',
});
Comment.belongsTo(Post, {
	foreignKey: 'post_id',
});

module.exports = {
	User,
	Post,
	Comment,
};