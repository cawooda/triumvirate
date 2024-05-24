const router = require('express').Router();

const modelNameRoute = require('./modelNameRoute');

//This is the basis for '/api' routes
// delviering queries to the database
//It will be configured into the following routes once they are
//need and built in sequelize:
//!!!!Comment the following line out to get started:!!!

router.use('/modelObject', modelNameRoute);

router.get('/',async (req,res) =>{
    console.log('api reached');
    res.status(200).send('looks good from api')
});

// eg User Route, Post Route, etc

module.exports = router;