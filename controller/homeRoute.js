const router = require('express').Router();

//This is the basis for '/' routes delviering views from handlebars
router.use('/',async (req,res) => {
    console.log('home route reached');
    res.send('status OK and you have reached home route');
})

router.get('*',(req,res)=>{
    console.log("* reached");
})

module.exports = router;


