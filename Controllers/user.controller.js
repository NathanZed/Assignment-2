const Express = require('express');
const BodyParser = require('body-parser');

const app = Express();
app.use(BodyParser.json());

const UserService = require('../services/database.service');

exports.getUsers = async function (request, response, action) {
  try {
    await action();
  } catch (e) {
    response.sendStatus( // Controller?
      e.code === 11000
            || e.stack.includes('ValidationError')
            || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
        ? 400 : 500,
    );
  }
};
