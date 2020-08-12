const express = require('express');
const users = require('./userDb');
const { validateUserId, validateUser } = require('../middleware/user');

const router = express.Router();

// Create user
router.post('/', validateUser, (req, res, next) => {
  users
    .insert(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
});

// Add post for user
router.post('/:id/posts', validateUserId, (req, res) => {});

// Get all users
router.get('/', (req, res, next) => {
  users
    .get()
    .then(users => res.status(200).json(users))
    .catch(next);
});

// Get single user
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

// Get posts for user
router.get('/:id/posts', validateUserId, (req, res) => {});

// Delete user
router.delete('/:id', validateUserId, (req, res, next) => {
  users
    .remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          msg: 'The user has been deleted'
        });
      } else {
        res.status(404).json({
          msg: 'The user could not be found'
        });
      }
    })
    .catch(next);
});

// Update user
router.put('/:id', validateUser, validateUserId, (req, res, next) => {
  users
    .update(req.params.id, req.body)
    .then(user => res.status(200).json(user))
    .catch(next);
});

module.exports = router;
