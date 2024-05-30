const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

const modelName = 'comment';

router.get('/', async (req, res) => {
	try {
		const commentData = await Comment.findAll({
			include: [Post, User],
		});
		res.status(200).json(commentData);
	} catch (error) {
		console.log(
			`ERROR: Get Requesting all ${modelName} and we've sent back the body you sent us`,
		);
		res.status(500).json(error);
	}
});

router.post('/', async (req, res) => {
	//accepts a new comment and creates it
	try {
		const newComment = await Comment.create({
			user_id: req.session.user_id,
			content: req.body.content,
			post_id: req.body.post_id,
		});
		res.status(200).json(newComment);
	} catch (error) {
		console.log(
			`ERROR: POST creating ${modelName} and we've sent back the body you sent us`,
		);
		res.status(500).json(error);
	}
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		await Post.destroy({
			where: {
				id,
			},
		});
	} catch (error) {
		console.log(
			`ERROR: DELETING ${modelName} with id ${id} and we've sent back the body you sent us`,
		);
		res.status(500).json(error);
	}
});

module.exports = router;
