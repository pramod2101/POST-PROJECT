const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const Post = require('./models/postmodel');
const Comment = require('./models/commentmodel');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Define API endpoints
app.get('/posts/:postId/comments', async (req, res) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findByPk(postId, { include: Comment }); // Include comments associated with the post
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post.comments); // Return comments for the post
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/posts/:postId/comments', async (req, res) => {
    const postId = req.params.postId;
    const { comment } = req.body;

    try {
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const newComment = await Comment.create({ postId, comment });
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Sync models and start server
sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });
