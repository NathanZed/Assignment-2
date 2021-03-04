const User = require('../models/user');
// const Product = require('../models/product');

exports.getUsers = async function (query) {
  try {
    const users = await User.find(query);
    return users;
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users');
  }
};
/*
exports.getProducts = async function (query) {
  try {
    const products = await Product.find(query);
    return products;
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users');
  }
};
*/
