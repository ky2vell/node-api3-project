const users = require('../users/userDb');

function validateUserId() {
  return async (req, res, next) => {
    try {
      const user = await users.getById(req.params.id);
      if (user) {
        req.user = user;

        next();
      } else {
        res.status(404).json({ msg: 'User not found.' });
      }
    } catch (err) {
      next(err);
    }
  };
}

function validateUser() {
  return (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ msg: 'Missing user data' });
    } else if (!req.body.name) {
      return res.status(400).json({ msg: 'Missing required name field' });
    }

    next();
  };
}

function validatePost() {
  return (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ msg: 'Missing required text field' });
    }

    next();
  };
}

module.exports = { validateUserId, validateUser, validatePost };
