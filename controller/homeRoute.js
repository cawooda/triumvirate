const router = require('express').Router();
const { Post, Comment, User } = require('../models');

//This is the basis for '/' routes delviering views from handlebars
router.get('/', async (req, res) => {
	console.log('home route reached');
	const postData = await Post.findAll({
		include: [Comment, User],
	});

	console.log(postData);
	//res.send('route home reached');
	res.render('posts', { postData, logged_in: req.session.logged_in });
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
