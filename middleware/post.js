const posts = require('../posts/postDb');

function validatePostId() {
  return async (req, res, next) => {
    try {
      const post = await posts.getById(req.params.id);
      if (post) {
        req.post = post;

        next();
      } else {
        res.status(404).json({ msg: 'Post not found.' });
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = { validatePostId };
