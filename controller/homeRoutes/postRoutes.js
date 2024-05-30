const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

const modelName = 'Post';

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
