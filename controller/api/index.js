const router = require('express').Router();
const expressHandlebars = require('express-handlebars');
const handlebars = expressHandlebars.create({});
const postRoutes = require('./postRoutes');
const chatRoutes = require('./chatRoutes');
//const commentRoutes = require('./commentRoutes');
//const mediaRoutes = require('./mediaRoutes');
//const messageRoutes = require('./messageRoutes');
//const userRoutes = require('./userRoutes');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

router.use('/posts',postRoutes);
router.use('/chats',chatRoutes);

// router.use('/',async (req,res) =>{
//     console.log('api reached');
//     res.status(200).send('looks good from api')
// });

// eg User Route, Post Route, etc

module.exports = router;
