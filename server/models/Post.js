const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        
    },
    tags: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        
    },
    imageUrl: String,
},{
    timestamps: true,
})

PostSchema.index({ createdAt: 1})

module.exports = mongoose.model('Post', PostSchema);
