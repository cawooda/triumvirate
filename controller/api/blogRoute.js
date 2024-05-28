const router = require('express').Router();

//This is a template route for a model. It has templates for most types of requests
// modelName will need to be replaced by the relevant sequelize models

//!!!!!UNCOMMENT BELOW TO GET STARTED WIHT MODELS
//const { ModelName } = require('../../models');

const modelName = 'blogs';

router.get('/', async (req, res) => {
	const body = req.body;
	const response = {
		id: '1',
		testResponse: true,
	};

	try {
		console.log(`Get Requesting all ${modelName}`);
	} catch (error) {
		console.log(
			`ERROR: Get Requesting all ${modelName} and we've sent back the body you sent us`,
		);
		res.status(400).json(body);
	}
	res.status(200).json(response);
});

router.get('/getSomething', async (req, res) => {});

router.put('/putSomething', async (req, res) => {});

router.post('/postSomething', async (req, res) => {});

router.delete('/deleteSomething/:id', async (req, res) => {});

module.exports = router;
