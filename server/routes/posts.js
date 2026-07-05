const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/auth');

// All post routes require active user authentication session
router.post('/', authMiddleware, postController.createPost);
router.get('/', authMiddleware, postController.getAllPosts);
router.put('/:id/like', authMiddleware, postController.likePost);
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router