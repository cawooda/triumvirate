const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

const postRoutes = require('./postRoutes');
const chatRoutes = require('./chatRoutes');
const userRoutes = require('./userRoutes');

//This is the basis for '/' routes delviering views from handlebars
router.use('/', postRoutes);
router.use('/chats', chatRoutes);
router.use('/users', userRoutes);

module.exports = router;
