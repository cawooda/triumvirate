const router = require('express').Router();
const { Post, Comment, User, Media } = require('../../models');

// import custom middleware
const isLoggedIn = require('../../utils/isLoggedIn');

// import multer upload utility
const upload = require('../../utils/upload');

const modelName = 'Post';

router.get('/', async (req, res) => {
	try {
		const postData = await Post.findAll({
			include: [Comment, User],
		});
		console.log(`Get Requesting all ${modelName}`);
		res.status(200).json(postData);
	} catch (error) {
		console.log(
			`ERROR: Get Requesting all ${modelName} and we've sent back the body you sent us`,
		);
		res.status(500).json(error);
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;

	try {
		const post = await Post.findByPk(id, {
			include: Comment,
		});
		console.log(`Get Requesting all ${modelName} by id ${id}`);
		res.status(200).json(post);
	} catch (error) {
		console.log(
			`ERROR: Get Requesting ${modelName} by id ${id} and we've sent back the body you sent us`,
		);
		res.status(500).json(error);
	}
});

router.put('/:id', upload.single('upload'), async (req, res) => {
	const id = req.params.id;
	const body = req.body;
	console.log('body', req.body);
	try {
		// update Post object
		const updatePost = await Post.update({
			title: req.body.title,
			content: req.body.content,
			id: req.postId,
		});
		const post = await Post.update(body);

		console.log(`updating ${modelName} by id ${id} with ${body}`);
		res.status(200).json(post);
	} catch (error) {
		console.log(
			`ERROR: Get Requesting update to ${modelName} and we've sent back the body you sent us`,
		);
		res.status(500).json(error);
	}
});

// /api/posts route to create new post
router.post('/', upload.single('upload'), async (req, res) => {
	console.log('req body', req.body);
	try {
		// create array to send to response
		const responseArr = [];

		// create new Post object
		const newPost = await Post.create({
			title: req.body.title,
			content: req.body.content,
			user_id: req.session.user_id,
		});

		// push new Post object on response array
		responseArr.push(newPost);

		// if file uploaded format path and create Media object
		if (req.file) {
			// format filepath
			let formattedPath = `${req.file.path.replace(/\\/g, '/')}`;
			formattedPath = formattedPath.replace('public', '');
			console.log(formattedPath);

			// create new Media object for uploaded file
			const newMedia = await Media.create({
				filename: req.file.filename,
				original_name: req.file.originalname,
				mimetype: req.file.mimetype,
				path: formattedPath,
				size: req.file.size,
				post_id: newPost.dataValues.id,
			});

			// push new Media object on response array
			responseArr.push(newMedia);
		}

		res.status(200).json(responseArr);
	} catch (error) {
		console.log(error);
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

		res.status(200).json({
			message: 'successfully deleted blog.',
		});
	} catch (error) {
		console.log(
			`ERROR: DELETING ${modelName} with id ${id} and we've sent back the body you sent us`,
		);
		res.status(500).json(error);
	}
});

// /api/posts/upload route to upload media to filesystem
router.post('/upload', upload.single('upload'), (req, res) => {
	console.log(req.body);
	res.send('Uploaded successfully!');
	// upload(req, res, (err) => {
	// 	if (err) {
	// 		res.status(500).json(error);
	// 	} else {
	// 		console.log(req.file);
	// 		res.status(200).json(req.file);
	// 	}
	// });
});

// /api/posts/like/:id route to increment a posts likes
router.put('/like/:id', isLoggedIn, async (req, res) => {
	const postId = req.params.id;

	try {
		// find post with given id
		const postData = await Post.findByPk(postId);

		// if post with given id found increment likes
		if (postData) {
			await postData.increment('likes', {
				where: {
					id: postId,
				},
			});

			res.status(200).end();
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
