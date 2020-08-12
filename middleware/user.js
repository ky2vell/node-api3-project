const users = require('../users/userDb');

const validateUserId = (req, res, next) => {
  users
    .getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;

        next();
      } else {
        res.status(404).json({ msg: 'User not found.' });
      }
    })
    .catch(next);
};

const validateUser = (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ msg: 'Missing user data' });
  } else if (!req.body.name) {
    return res.status(400).json({ msg: 'Missing required name field' });
  }

  next();
};

module.exports = { validateUserId, validateUser };
