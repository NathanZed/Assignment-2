const Mongoose = require('mongoose');

require('bob-mongoose-currency').loadType(Mongoose);

module.exports = Mongoose.model('Product', new Mongoose.Schema({
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true },
    age: { type: Number, default: 0 },
    socialSecurity: { type: String, required: true, unique: true,},
    address: { type: String},
    phoneNumber: { type: String},
}, {
    toJSON: {
        getters: true,
        virtuals: false,
    },
}));
