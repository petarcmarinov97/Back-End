const { Schema, model } = require('mongoose');

const schema = new Schema({
    name:{ type:String, required:[true,'Name field is required'], minlength:4 },
    city:{ type:String, required:[true,'City field is required'], minlength:3 },
    imageUrl:{ type:String, required:[true,'Image field is required'],match: [/^https?/, 'Image must be valir URL'] },
    rooms:{ type:Number, required:[true,'Rooms field is required'], min:1, max:100 },
    bookedBy:[{ type:Schema.Types.ObjectId, ref:'User' }],
    owner: { type:Schema.Types.ObjectId, ref:'User', required:true }
});

module.exports = model('Hotel', schema);