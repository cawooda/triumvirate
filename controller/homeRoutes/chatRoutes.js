const router = require('express').Router();
const { Chat } = require('../../models');

const modelName = 'Chat';

router.get('/', async (req, res) => {
	console.log('home route reached');
	const chatData = await Chat.findAll({
		//include: User,
	});
	console.log('chatData', chatData);
	const chats = chatData.map((chat) => chat.get({ plain: true }));

	console.log('chats', chats);
	//res.send('route home reached');
	res.render('chats', { chats });
});

module.exports = router;
