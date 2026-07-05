const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ""
    },
    profilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true }); [span_3](start_span)// Automatically adds createdAt and updatedAt timestamps[span_3](end_span)

module.exports = mongoose.model('User', UserSchema);