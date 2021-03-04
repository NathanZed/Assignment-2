const Express = require('express');
const BodyParser = require('body-parser');

const app = Express();
app.use(BodyParser.json());

const UserService = require('../Services/user.service');

exports.getUsers = async (request, response, action) => {
  try {
    const users = await UserService.getUsers({}, page, limit)
    await action();
  } catch (e) {
    response.sendStatus(
      e.code === 11000
            || e.stack.includes('ValidationError')
            || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
        ? 400 : 500,
    );
  }
};
