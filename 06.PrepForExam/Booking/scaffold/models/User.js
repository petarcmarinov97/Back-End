const { Schema, model } = require('mongoose');

const schema = new Schema({
    username: { type: String, require: true},
    hashedPassword: {type: String, required: true}
});

module.exports = model('User', schema);