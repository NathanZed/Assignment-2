const Express = require('express');
const bodyParser = require('body-parser');
const Product = require('./Services/database.services');
const User = require('./Services/database.services');

const app = Express();
app.use(bodyParser.json());

const doActionThatMightFailValidation = async (request, response, action) => {
  try {
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

// Product
app.route('/products')
  .get(async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
      response.json();
    });
  })
  .post(async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
      // await new Product(request.body).save();
      Product.saveProduct();
      response.sendStatus(201);
    });
  })
  .delete(async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
      response.sendStatus(await Product.deleteProduct > 0 ? 200 : 404);
    });
  });

app.route('/product/:sku')
  .get(async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
      Product.getSku(request);
      const getResult = request;
      if (getResult != null) {
        response.json(getResult);
      } else {
        response.sendStatus(404);
      }
    });
  })
  .delete(async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
      response.sendStatus((await Product.deleteAllProd(request)({
        sku: request.params.sku,
      })).deletedCount > 0 ? 200 : 404);
    });
  })
  .put('/products/:sku', async (request, response) => {
    const { sku } = request.params;
    const product = request.body;
    product.sku = sku;
    await doActionThatMightFailValidation(request, response, async () => {
      Product.updateProduct(request);
      response.sendStatus(200);
    });
  })
  .patch('/products/:sku', async (request, response) => {
    const { sku } = request.params;
    const product = request.body;
    delete product.sku;
    await doActionThatMightFailValidation(request, response, async () => {
      const patchResult = await Product.updateOneProduct(sku)
        .select('-_id -__v');
      if (patchResult != null) {
        response.json(patchResult);
      } else {
        response.sendStatus(404);
      }
    });
  });

// User
app.route('/user')
  .get(async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
      response.json();
    });
  })
  .post(async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
      User.saveUser();
      response.sendStatus(201);
    });
  })
  .delete(async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
      response.sendStatus(await User.deleteUser > 0 ? 200 : 404);
    });
  });

app.route('/user/:ssn')
  .get(async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
      Product.getSSN(request);
      const getResult = request;
      if (getResult != null) {
        response.json(getResult);
      } else {
        response.sendStatus(404);
      }
    });
  })
  .delete(async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
      response.sendStatus((await Product.deleteAllUser({
        sku: request.params.sku,
      })).deletedCount > 0 ? 200 : 404);
    });
  })
  .put(async (request, response) => {
    const { ssn } = request.params;
    const user = request.body;
    user.ssn = ssn;
    await doActionThatMightFailValidation(request, response, async () => {
      Product.updateUser(ssn);
      response.sendStatus(200);
    });
  })
  .patch(async (request, response) => {
    const { ssn } = request.params;
    const user = request.body;
    delete user.sku;
    await doActionThatMightFailValidation(request, response, async () => {
      const patchResult = Product.updateOneUser(ssn)
        .select('-_id -__v');
      if (patchResult != null) {
        response.json(patchResult);
      } else {
        response.sendStatus(404);
      }
    });
  });
