const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Comment = require('./commentmodel'); // Import the Comment model

const Post = sequelize.define('posts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    postUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    postDescription: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Define association
Post.hasMany(Comment, { foreignKey: 'postId' }); // Assuming postId is the foreign key in Comment model

module.exports = Post;
