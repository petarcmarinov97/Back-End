const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: { type: String, required: [true, 'Title is required'] },
    description: { type: String, required: [true, 'Description is required'], maxlength:[50, 'Description must be less than 50 characters long'] },
    imageUrl: { type: String, required: [true, 'Image is required'] },
    public: { type: Boolean, default: false},
    userLiked: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    createdAt: { type: Date, default: Date.now },
    author:{ type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('Play', schema);