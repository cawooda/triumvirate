const router = require('express').Router();

//This is the basis for '/' routes delviering views from handlebars
router.use('/',(req,res)=>{
    console.log('home routes reached');
    res.send('home routes reached');
});

module.exports = router;


