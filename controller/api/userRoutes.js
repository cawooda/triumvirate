const router = require('express').Router();
const { User } = require('../../models');

// /api/users/signup create new user
router.post('/signup', async (req, res) => {
	try {
		// create new user with data from req.body
		const newUser = await User.create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		});

		// create session variables to store user id and logged in status
		req.session.user_id = newUser.id;
		req.session.logged_in = true;


		res.status(200).json(newUser);
	} catch (error) {
		res.status(500).json(error);
	}
});