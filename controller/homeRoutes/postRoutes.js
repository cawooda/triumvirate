const router = require('express').Router();
const { Post, Comment, User, Media } = require('../../models');

// import custom middleware
const isLoggedIn = require('../../utils/isLoggedIn');

const modelName = 'Post';

// /posts/create-post route to render add new post form
router.get('/create-post', isLoggedIn, async (req, res) => {
	try {
		// render create-post page
		res.status(200).render('create-post', {
			logged_in: req.session.logged_in,
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

// /posts/:id to render individual post
router.get('/:id', async (req, res) => {
	console.log('req.params.id', req.params.id);
	const postId = req.params.id;

	try {
		const postData = await Post.findOne({
			where: { id: postId },
			include: [
				{
					model: Comment,
					include: User,
				},
				User,
				Media,
			],
		});

		// if post with given id found increment views
		if (postData) {
			await postData.increment('views', {
				where: {
					id: postId,
				},
			});

			const post = postData.get({ plain: true });

			res.render('post', {
				post,
				logged_in: req.session.logged_in,
				user_id: req.session.user_id,
			});
		} else {
			res.status(404).json({
				message: `There is no post with id: ${postId}`,
			});
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
