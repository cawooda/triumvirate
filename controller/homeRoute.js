const router = require('express').Router();
const { Post, Comment, User } = require('../models');

//This is the basis for '/' routes delviering views from handlebars
router.get('/', async (req, res) => {
	console.log('home route reached');
	const postData = await Post.findAll({
		include: [Comment, User],
	});

	console.log(postData);
	//res.send('route home reached');
	res.render('posts', { postData });
});

module.exports = router;
