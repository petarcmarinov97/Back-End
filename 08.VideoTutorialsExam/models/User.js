const { Schema, model } = require('mongoose');

const schema = new Schema({
    username: { type: String, required: true},
    hashedPassword: {type: String, required: true},
    enrolledCourses:[{ type:Schema.Types.ObjectId, ref:'Course', default:[] }]
});

module.exports = model('User', schema);