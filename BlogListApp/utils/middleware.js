const logger = require('./logger');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid' });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    });
  }

  next(error);
};

const getTokenFrom = (request) => {
  const auth = request.get('authorization');
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    return auth.substring(7);
  }
  return null;
};

const tokenExtractor = async (request, response, next) => {
  request.token = getTokenFrom(request);

  next();
};

const userExtractor = async (request, response, next) => {
  //Token perustainen autentikointi
  const token = getTokenFrom(request);

  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' });
    }

    request.user = await User.findById(decodedToken.id);
  }

  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
};
