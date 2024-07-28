// models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Buffer, required: true },
    imageType: { type: String, required: true }
});

PostSchema.virtual('imageSrc').get(function() {
    if (this.image != null && this.imageType != null) {
        return `data:${this.imageType};base64,${this.image.toString('base64')}`;
    }
});

module.exports = mongoose.model('Post', PostSchema);
