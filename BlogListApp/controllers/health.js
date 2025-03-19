const healthRouter = require('express').Router();

healthRouter.get('/', (req, res) => {
  res.status(200).send('Service live 11.21');
});

module.exports = healthRouter;
