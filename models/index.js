const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Chat = require('./Chat');
const Message = require('./Message');

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

// one-to-many relationship between User and Chat (user_a)
User.hasMany(Chat, {
	foreignKey: 'user_a'
});
Chat.belongsTo(User, {
	foreignKey: 'user_a',
});
// one-to-many relationship between User and Chat (user_b)
User.hasMany(Chat, {
	foreignKey: 'user_b'
});
Chat.belongsTo(User, {
	foreignKey: 'user_b',
});

// one-to-many relationship between Chat and Message
Chat.hasMany(Message, {
	foreignKey: 'chat_id',
	onDelete: 'CASCADE',
});
Message.belongsTo(Chat, {
	foreignKey: 'chat_id',
});

module.exports = {
	User,
	Post,
	Comment,
};