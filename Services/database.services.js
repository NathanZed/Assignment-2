const Express = require('express');
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');

const Product = require('../models/product.js');
const User = require('../models/user');

const app = Express();
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// product
app.getSku = async (request) => {
  await Product.findOne({ sku: request.params.sku }).select('-_id -__v');
};

app.saveProduct = async (request) => {
  await new Product(request.body).save();
};

app.deleteProduct = async (request, response) => {
  response.sendStatus(await Product.deleteMany(request.query));
};

app.deleteAllProd = async (request) => {
  await Product.deleteOne(request);
};

app.updateProduct = async (request, response) => {
  await Product.findOneAndReplace({ request }, response, {
    upsert: true,
  });
};

app.updateOneProduct = async (request, response) => {
  await Product
    .findOneAndUpdate({ request }, response, {
      new: true,
    });
};

// users
app.getSSN = async (request) => {
  await User.findOne({ sku: request.params.sku }).select('-_id -__v');
};

app.saveUser = async (request) => {
  await new User(request.body).save();
};

app.deleteUser = async (request, response) => {
  response.sendStatus(await Product.deleteMany(request.query));
};

app.deleteAllUser = async (request) => {
  await User.deleteOne(request);
};

app.updateUser = async (request, response) => {
  await User.findOneAndReplace({ request }, response, {
    upsert: true,
  });
};

app.updateOneUser = async (request, response) => {
  await User
    .findOneAndUpdate({ request }, response, {
      new: true,
    });
};

(async () => {
  await Mongoose.connect('mongodb+srv://ComAd:Admin@database.n8bk7.mongodb.net/Database?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  // app.listen(8080);
})();

const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('It Connects!');
});
