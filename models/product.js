const Mongoose = require('mongoose');

require('bob-mongoose-currency').loadType(Mongoose);

module.exports = Mongoose.model('Product', new Mongoose.Schema({
  sku: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  price: {
    type: Mongoose.Types.Currency,
    required: true,
    min: 0,
    get: (price) => price / 100,
  },
}, {
  toJSON: {
    getters: true,
    virtuals: false,
  },
}));
