// middleware to redirect to /login if not logged in
const isLoggedIn = (req, res, next) => {
	if (!req.session.logged_in) {
		res.redirect('/users/login');
		return;
	}

	next();
};

module.exports = isLoggedIn;
