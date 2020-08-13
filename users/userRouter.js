const express = require('express');
const users = require('./userDb');
const posts = require('../posts/postDb');
const {
  validateUserId,
  validateUser,
  validatePost
} = require('../middleware/user');

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
router.get('/:id', validateUserId(), (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }
});

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

// Get posts for user
router.get('/:id/posts', validateUserId(), async (req, res, next) => {
  try {
    const posts = await users.getUserPosts(req.user.id);
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

// Add new post for user
router.post(
  '/:id/posts',
  validatePost(),
  validateUserId(),
  async (req, res, next) => {
    try {
      const newPost = await posts.insert({
        user_id: req.user.id,
        text: req.body.text
      });
      res.status(201).json(newPost);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
