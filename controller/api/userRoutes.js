const router = require('express').Router();
const { User } = require('../../models');

// /api/users/signup create new user
router.post('/signup', async (req, res) => {
	try {
		console.log('/signup reached');

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

// /api/users/login login for existing user
router.post('/login', async (req, res) => {
	try {
		// find user with provided email
		const userData = await User.findOne({
			where: {
				email: req.body.email,
			},
		});

		// if user not found send error
		if (!userData) {
			res.status(400).json({
				message: 'Incorrect username or password.',
			});
			return;
		}

		// test password validity with User instance method
		const isValidPassword = await userData.isCorrectPassword(
			req.body.password,
		);

		// if password is wrong send error
		if (!isValidPassword) {
			res.status(400).json({
				message: 'Incorrect username or password.',
			});
			return;
		}

		// otherwise update session variables for user id and logged in status
		req.session.user_id = userData.id;
		req.session.logged_in = true;

		// send success message
		res.status(200).json({
			user: userData,
			message: 'Successfully logged in.',
		});
	} catch (error) {}
});

module.exports = router;
