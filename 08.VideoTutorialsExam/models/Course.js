const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: { type: String, required:[true,'Title field is required'], minlength:4 },
    description: { type:String, required:[true,'Description field is required'], minlength:20 },
    imageUrl: { type:String, required:[true,'Image field is required'],match: [/^https?/, 'Image must be valir URL'] },
    isPublic: { type: Boolean, default: false },
    usersEnrolled: [{ type:Schema.Types.ObjectId, ref:'User' }],
    owner: { type:Schema.Types.ObjectId, ref:'User', required:true }

},{ timestamps: { createdAt: 'created_at' } });

module.exports = model('Course', schema);