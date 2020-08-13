const express = require('express');
const posts = require('./postDb');
const { validatePostId } = require('../middleware/post');
const { validatePost } = require('../middleware/user');

const router = express.Router();

// Get all posts
router.get('/', async (req, res, next) => {
  try {
    const postList = await posts.get();
    res.status(200).json(postList);
  } catch (err) {
    next(err);
  }
});

// Get single post
router.get('/:id', validatePostId(), (req, res, next) => {
  try {
    res.status(200).json(req.post);
  } catch (err) {
    next(err);
  }
});

// Delete Post
router.delete('/:id', validatePostId(), async (req, res, next) => {
  try {
    const count = await posts.remove(req.params.id);
    res.status(200).json({
      msg: `${count} post(s) have been deleted`
    });
  } catch (err) {
    next(err);
  }
});

// Update Post
router.put('/:id', validatePost(), validatePostId(), async (req, res, next) => {
  try {
    const post = await posts.update(req.params.id, req.body);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
