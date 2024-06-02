const router = require('express').Router();
const { User, Post, Comment, Media } = require('../../models');

// import custom middleware
const isLoggedIn = require('../../utils/isLoggedIn');

// /users/signup route to render signup page
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

// /users/login route to render login page
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

// /users/profile route to render profile page
router.get('/profile', isLoggedIn, async (req, res) => {
	try {
		// get all posts belonging to logged in user
		const userData = await User.findByPk(req.session.user_id, {
			include: Post,
		});

		// serialize data for rendering
		const user = userData.get({ plain: true });

		// extract just the posts to pass to render
		const posts = user.posts;

		// render profile page
		res.render('profile', {
			posts,
			logged_in: req.session.logged_in,
			user_id: req.session.user_id,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

module.exports = router;
