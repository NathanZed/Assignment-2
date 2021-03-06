const express = require('express');

const router = express.Router();
const User = require('./Controllers/user.controller');

module.exports = router;
// Will always go to User because of route
router
  .route('/')
  .get(async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
      response.json(await User.find(request.query).select('-_id -__v'));
    });
  })
  .post(async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
      await new User(request.body).save();
      response.sendStatus(201);
    });
  })
  .delete(async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
      response.sendStatus((await User.deleteMany(request.query)).deletedCount > 0 ? 200 : 404);
    });
  });

router
  .route('/:SSN')
  .get(async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
      const getResult = await User.findOne({ sku: request.params.sku }).select('-_id -__v');
      if (getResult != null) {
        response.json(getResult);
      } else {
        response.sendStatus(404);
      }
    });
  })
  .delete(async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
      response.sendStatus((await User.deleteOne({
        sku: request.params.sku,
      })).deletedCount > 0 ? 200 : 404);
    });
  })
  .put(async (request, response) => {
    const { ssn } = request.params;
    const user = request.body;
    user.ssn = ssn;
    await doActionThatMightFailValidation(request, response, async () => {
      await User.findOneAndReplace({ ssn }, user, {
        upsert: true,
      });
      response.sendStatus(200);
    });
  })
  .patch(async (request, response) => {
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
  });
