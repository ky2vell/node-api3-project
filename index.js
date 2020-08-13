const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const logger = require('./middleware/logger');
const error = require('./middleware/error');

const app = express();

// MiddleWare
app.use(express.json());
app.use(logger);

// API Routes
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

// Error MiddleWare
app.use(error);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
