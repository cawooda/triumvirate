const router = require('express').Router();
const {Post,Comment,User} = require('../../models');

const modelName = 'Post';

router.get('/', async (req,res) => {
    try {
        const postData = await Post.findAll({
            include: [Comment,User]
        });
        console.log(`Get Requesting all ${modelName}`);
        res.status(200).json(postData);
    } catch (error) {
        console.log(`ERROR: Get Requesting all ${modelName} and we've sent back the body you sent us`)
        res.status(400).json(body);
    }
    
});

router.get('/:id', async (req,res) => {
    const id = req.params.id;
    try {
        const post = await Post.findByPk(id,{
            include: Comment
        });
        console.log(`Get Requesting all ${modelName} by id ${id}`);
        res.status(200).json(post);
    } catch (error) {
        console.log(`ERROR: Get Requesting ${modelName} by id ${id} and we've sent back the body you sent us`)
        res.status(400).json(body);
    }
});

router.put('/:id', async (req,res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        const post = await Post.update(body);

        console.log(`updating ${modelName} by id ${id} with ${body}`);
        res.status(200).json(post);
    } catch (error) {
        console.log(`ERROR: Get Requesting update to ${modelName} and we've sent back the body you sent us`)
        res.status(400).json(body);
    }
})

router.post('/', async (req,res) => {
    const body = req.body;
    try {
        Post.create(body);
        console.log(`creating new  ${modelName} from ${body}`);
        res.status(200).json(body);
    } catch (error) {
        console.log(`ERROR: Get Requesting all ${modelName} and we've sent back the body you sent us`)
        res.status(400).json(body);
    }
    
})

router.delete('/deleteSomething/:id', async (req,res) => {

})



module.exports = router;