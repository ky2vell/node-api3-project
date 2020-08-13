const express = require('express');
const users = require('./userDb');
const { validateUserId, validateUser } = require('../middleware/user');

const router = express.Router();

// Create user
router.post('/', validateUser(), async (req, res, next) => {
  try {
    const user = await users.insert(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// Add post for user
router.post('/:id/posts', validateUserId(), (req, res) => {});

// Get all users
router.get('/', async (req, res, next) => {
  try {
    const userList = await users.get();
    res.status(200).json(userList);
  } catch (err) {
    next(err);
  }
});

// Get single user
router.get('/:id', validateUserId(), (req, res) => {
  res.status(200).json(req.user);
});

// Get posts for user
router.get('/:id/posts', validateUserId(), (req, res) => {});

// Delete user
router.delete('/:id', validateUserId(), async (req, res, next) => {
  try {
    const count = await users.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({
        msg: 'The user has been deleted'
      });
    } else {
      res.status(404).json({
        msg: 'The user could not be found'
      });
    }
  } catch (err) {
    next(err);
  }
});

// Update user
router.put('/:id', validateUser(), validateUserId(), async (req, res, next) => {
  try {
    const user = await users.update(req.params.id, req.body);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
