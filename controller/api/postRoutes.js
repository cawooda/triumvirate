const router = require('express').Router();
const { Post, Comment, User, Media } = require('../../models');

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

router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const body = req.body;

	try {
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
	try {
		// create new Post object
		const newPost = await Post.create({
			title: req.body.title,
			content: req.body.content,
			user_id: req.session.user_id,
		});

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

		res.status(200).json([newPost, newMedia]);
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

module.exports = router;
