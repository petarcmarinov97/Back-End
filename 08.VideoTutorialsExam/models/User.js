const { Schema, model } = require('mongoose');

const schema = new Schema({
    username: { type: String, required: true},
    hashedPassword: {type: String, required: true},
    enrolledCourses:[{type:String}]
});

module.exports = model('User', schema);