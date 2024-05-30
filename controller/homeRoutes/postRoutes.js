const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

const modelName = 'Post';

router.get('/', async (req, res) => {
	console.log('home route reached');
	const postData = await Post.findAll({
		include: [Comment, User],
	});

	const posts = postData.map((post) => post.get({ plain: true }));

	console.log('posts', posts);
	//res.send('route home reached');
	res.render('posts', { posts });
});

module.exports = router;
