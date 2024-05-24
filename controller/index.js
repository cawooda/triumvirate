const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/',(req,res)=>{
    console.log('controller reached');
    res.send('controller reached');
});

router.use('/',homeRoutes);
//router.use('/api',apiRoutes);



router.all('*',(req,res)=>{
    res.status(200).send("router index found");
})

module.exports = router;