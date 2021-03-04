const Mongoose = require('mongoose');

require('bob-mongoose-currency').loadType(Mongoose);

module.exports = Mongoose.model('User', new Mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true, default: 0 },
  socialSecurity: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return /\d(3)-\d(2)-\d(4)/.test(value);
      },
    },
  },
  address: { type: String },
  phoneNumber: { type: String },
}, {
  toJSON: {
    getters: true,
    virtuals: false,
  },
}));
