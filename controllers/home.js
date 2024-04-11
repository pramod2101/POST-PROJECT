const Post = require('../models/postmodel');
const Comment = require('../models/commentmodel'); // Assuming you have a Comment model

exports.getDetails = (req, res, next) => {
    Post.findAll({ include: Comment }) // Include comments when fetching posts
        .then(result => {
            console.log(result);
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        });
};

exports.postDetails = (req, res, next) => {
    let data = req.body;
    console.log("Received data:", data); // Log received data for debugging

    if (!data || !data.postUrl || !data.postDescription) {
        console.error("Invalid data received:", data);
        return res.status(400).json({ error: 'Invalid data received' });
    }

    Post.create({
        postUrl: data.postUrl,
        postDescription: data.postDescription
    })
    .then(result => {
        console.log("Post created:", result); // Log created post for confirmation
        res.status(201).json(result);
    })
    .catch(err => {
        console.error("Error creating post:", err); // Log detailed error for troubleshooting
        res.status(500).json({ error: 'Internal error' });
    });
};

exports.postComment = (req, res, next) => {
    let data = req.body;
    console.log("Received comment data:", data); // Log received comment data for debugging

    if (!data || !data.postId || !data.comment) {
        console.error("Invalid comment data received:", data);
        return res.status(400).json({ error: 'Invalid comment data received' });
    }

    Comment.create({
        postId: data.postId,
        comment: data.comment
    })
    .then(result => {
        console.log("Comment added:", result); // Log added comment for confirmation
        res.status(201).json(result);
    })
    .catch(err => {
        console.error("Error adding comment:", err); // Log detailed error for troubleshooting
        res.status(500).json({ error: 'Internal error' });
    });
};
