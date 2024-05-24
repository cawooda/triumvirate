const router = require('express').Router();

//This is the basis for '/' routes delviering views from handlebars
router.all('/',async (req,res) => {
    console.log('home route reached');
    res.status(200).send('status OK and you have reached home route');
})

module.exports = router;


