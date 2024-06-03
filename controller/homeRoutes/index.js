const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

const postRoutes = require('./postRoutes');
const chatRoutes = require('./chatRoutes');
const userRoutes = require('./userRoutes');

//This is the basis for '/' routes delviering views from handlebars
router.use('/posts', postRoutes);
router.use('/chats', chatRoutes);
router.use('/users', userRoutes);

router.get('/', async (req, res) => {
	const postData = await Post.findAll({
		include: [Comment, User],
		order: [['date_created', 'DESC']],
	});

	const posts = postData.map((post) => post.get({ plain: true }));

	// console.log('posts', posts);
	// res.send('route home reached');
	res.render('posts', { posts, logged_in: req.session.logged_in });
});

module.exports = router;
