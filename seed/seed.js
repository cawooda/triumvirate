require('dotenv').config();
const sequelize = require('../config/connection');

const { Chat,Comment, Media, Message, Post, User } = require('../models');

const userData = require('./userData.json');
const chatData = require('./chatData.json');
const mediaData = require('./mediaData.json');
const messageData = require('./messageData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');


const seedDatabase = async () => {
    //refresh db tables
    await sequelize.sync({force:true})

    //bulk create users
    const users = await User.bulkCreate(userData, {
        individualHooks:true,
        returning:true,
    });
    //bulk create posts
    const posts = await Post.bulkCreate(postData, {
        individualHooks:true,
        returning:true,
    });

    const chats = await Chat.bulkCreate(chatData, {
        individualHooks:true,
        returning:true,
    });

    const comments = await Comment.bulkCreate(commentData, {
        individualHooks:true,
        returning:true,
    });

    const media = await Media.bulkCreate(mediaData, {
        individualHooks:true,
        returning:true,
    });

    const messages = await Message.bulkCreate(messageData, {
        individualHooks:true,
        returning:true,
    });
    //manually kill process
    process.exit(0);

}

seedDatabase();