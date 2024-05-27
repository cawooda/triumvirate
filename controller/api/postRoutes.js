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
        console.log(`ERROR: Get Requesting all ${modelName} and we've sent back the body you sent us`)
        res.status(400).json(body);
    }
});

router.put('/putSomething', async (req,res) => {
    
})

router.post('/postSomething', async (req,res) => {

})

router.delete('/deleteSomething/:id', async (req,res) => {

})



module.exports = router;