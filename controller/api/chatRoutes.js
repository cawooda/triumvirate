const router = require('express').Router();
const { Chat, User } = require('../../models');

const modelName = 'Chat';

router.get('/', async (req, res) => {
	try {
		const chatData = await Chat.findAll({
			include: [
				{ model: User, as: 'user_A' },
				{ model: User, as: 'user_B' },
			],
		});
		console.log(`Get Requesting all ${modelName}`);
		res.status(200).json(chatData);
	} catch (error) {
		console.log(error);
		console.log(
			`ERROR: Get Requesting all ${modelName} and we've sent back the body you sent us`,
		);
		res.status(500).json(req.body);
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const chat = await Chat.findByPk(id, {
			include: User,
		});
		console.log(`Get Requesting all ${modelName} by id ${id}`);
		res.status(200).json(chat);
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
		const chat = await Chat.update(body);

		console.log(`updating ${modelName} by id ${id} with ${body}`);
		res.status(200).json(chat);
	} catch (error) {
		console.log(
			`ERROR: Get Requesting update to ${modelName} and we've sent back the body you sent us`,
		);
		res.status(500).json(error);
	}
});

router.post('/', async (req, res) => {
	const body = req.body;
	try {
		Chat.create(body);
		console.log(`creating new  ${modelName} from ${body}`);
		res.status(200).json(body);
	} catch (error) {
		console.log(
			`ERROR: Get Requesting all ${modelName} and we've sent back the body you sent us`,
		);
		res.status(500).json(error);
	}
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		await Chat.destroy({
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
