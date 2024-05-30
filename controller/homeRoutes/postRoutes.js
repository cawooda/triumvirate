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

// /signup route to render signup page
router.get('/signup', async (req, res) => {
	try {
		// if user already logged in redirect to homepage
		if (req.session.logged_in) {
			res.redirect('/');
			return;
		}

		// otherwise render signup page
		res.status(200).render('signup');
	} catch (error) {
		res.status(500).json(error);
	}
});

// /login route to render login page
router.get('/login', async (req, res) => {
	try {
		// if user already logged in redirect to homepage
		if (req.session.logged_in) {
			res.redirect('/');
			return;
		}

		// otherwise render login page
		res.status(200).render('login');
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
