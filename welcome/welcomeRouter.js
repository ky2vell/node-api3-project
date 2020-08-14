const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    msg: "Welcome to Kyle's Router!",
    variable: process.env.MY_VARIABLE
  });
});

module.exports = router;
