const express = require('express');
const postsRouter = require('./routes/postsRouter');
const usersRouter = require('./routes/usersRouter');

const app = express();

app.use(express.json());

app.use('/api/posts', postsRouter)
app.use('/api/users', usersRouter)

app.listen(3000, () => {console.log(`Aplication is running on http://localhost:${process.env.PORT}`)});