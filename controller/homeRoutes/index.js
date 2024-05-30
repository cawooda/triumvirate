const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

const postRoutes = require('./postRoutes');
const chatRoutes = require('./chatRoutes');

//This is the basis for '/' routes delviering views from handlebars
router.use('/', postRoutes);
router.use('/chats', chatRoutes);

module.exports = router;
