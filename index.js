const Mongoose = require('mongoose');
const Express = require('express');
const BodyParser = require('body-parser');

const app = Express();

app.use(BodyParser.json());

(async () => {
  await Mongoose.connect('mongodb+srv://Admin:<password>@user.n8bk7.mongodb.net/User?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(8080);
})();
