const router = require('express').Router();
const { User } = require('../../models');

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

module.exports = router;

