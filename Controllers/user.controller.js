const UserService = require('../server');
// app.use('/User', user);

const doActionThatMightFailValidation = async (request, response, action) => {
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

exports.find = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json(await User.find(request.query).select('-_id -__v'));
  });
};

exports.findOne = async (req, res) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await User.findOne({ sku: request.params.sku }).select('-_id -__v');
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
};

exports.update = async (req, res) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await new User(request.body).save();
    response.sendStatus(201);
  });
};

exports.deleteOne = async (req, res) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await User.deleteOne({
      sku: request.params.sku,
    })).deletedCount > 0 ? 200 : 404);
  });
};

exports.deleteMany = async (req, res) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await User.deleteMany(request.query)).deletedCount > 0 ? 200 : 404);
  });
};

exports.FindOneAndReplace = async (req, res) => {
  const { ssn } = request.params;
  const user = request.body;
  user.ssn = ssn;
  await doActionThatMightFailValidation(request, response, async () => {
    await User.findOneAndReplace({ ssn }, user, {
      upsert: true,
    });
    response.sendStatus(200);
  });
};

exports.FindOneAndUpdate = async (request, response) => {
  const { SSN } = request.params;
  const user = request.body;
  delete user.SSN;
  await doActionThatMightFailValidation(request, response, async () => {
    const patchResult = await User
      .findOneAndUpdate({ ssn }, user, {
        new: true,
      })
      .select('-_id -__v');
    if (patchResult != null) {
      response.json(patchResult);
    } else {
      response.sendStatus(404);
    }
  });
};
