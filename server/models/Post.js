const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Establishes the relationship with the User model[span_0](start_span)[span_0](end_span)
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // Stores IDs of users who liked this post[span_1](start_span)[span_1](end_span)
        }
    ]
}, { timestamps: true }); // Automatically handles the post creation date[span_2](start_span)[span_2](end_span)

module.exports = mongoose.model('Post', PostSchema);











