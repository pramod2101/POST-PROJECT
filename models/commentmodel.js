const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Post = require('./postmodel'); // Import the Post model

const Comment = sequelize.define('comments', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'posts', // Assuming the table name in your database is 'posts'
            key: 'id'
        }
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Define association
Comment.belongsTo(Post, { foreignKey: 'postId' }); // Assuming postId is the foreign key in Comment model

module.exports = Comment;
