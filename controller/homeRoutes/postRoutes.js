const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

// import custom middleware
const isLoggedIn = require('../../utils/isLoggedIn');

const modelName = 'Post';

// /posts/create-post route to render add new post form
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

router.get('/:id', async (req, res) => {
	console.log('req.params.id', req.params.id);
	const postId = req.params.id;

	const postData = await Post.findOne({
		where: { id: postId },
		include: Comment,
	});

	const post = postData.get({ plain: true });

	res.render('post', {
		post,
		logged_in: req.session.logged_in,
		user_id: req.session.user_id,
	});
});

module.exports = router;
