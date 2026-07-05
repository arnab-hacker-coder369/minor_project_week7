const Post = require('../models/Post');

// Create a Post
exports.createPost = async (req, res) => {
    try {
        const { description } = req.body;
        const newPost = new Post({
            description,
            author: req.user // Tied to current authenticated user from middleware
        });

        const savedPost = await newPost.save();
        const populatedPost = await savedPost.populate('author', 'name email bio');
        res.status(201).json(populatedPost);
    } catch (err) {
        res.status(500).json({ message: 'Error creating post', error: err.message });
    }
};

// Get All Posts (Feed View)
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name email bio')
            .sort({ createdAt: -1 }); // Newest posts first
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching posts feed' });
    }
};

// Like / Unlike a Post
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Check if user has already liked the post
        if (post.likes.includes(req.user)) {
            // Unlike action: Remove user from likes array
            post.likes = post.likes.filter(id => id.toString() !== req.user);
        } else {
            // Like action: Add user to likes array
            post.likes.push(req.user);
        }

        await post.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: 'Error interacting with post' });
    }
};

// Delete Post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Verify ownership (only author can delete own post)
        if (post.author.toString() !== req.user) {
            return res.status(401).json({ message: 'User not authorized to delete this post' });
        }

        await post.deleteOne();
        res.status(200).json({ message: 'Post removed successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting post' });
    }
};