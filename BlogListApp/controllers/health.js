const healthRouter = require('express').Router();

healthRouter.get('/', (req, res) => {
  res.status(200).send('Service live');
});

module.exports = healthRouter;
