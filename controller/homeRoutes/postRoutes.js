const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

// import custom middleware
const isLoggedIn = require('../../utils/isLoggedIn');

const modelName = 'Post';

router.get('/', async (req, res) => {
	console.log('home route reached');
	const postData = await Post.findAll({
		include: [Comment, User],
	});

	const posts = postData.map((post) => post.get({ plain: true }));

	console.log('posts', posts);
	//res.send('route home reached');
	res.render('posts', { posts, logged_in: req.session.logged_in });
});

// route to get add new post form
router.get('/create-post', isLoggedIn, async (req, res) => {
	try {
		// render create-post page
		res.status(200).render('create-post', {
			loggedIn: req.session.logged_in,
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
