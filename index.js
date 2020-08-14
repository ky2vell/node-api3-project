require('dotenv').config();

const express = require('express');
const welcomeRouter = require('./welcome/welcomeRouter');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const logger = require('./middleware/logger');
const error = require('./middleware/error');

const app = express();

// MiddleWare
app.use(express.json());
app.use(logger);

// API Routes
app.use('/', welcomeRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

// Error MiddleWare
app.use(error);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
