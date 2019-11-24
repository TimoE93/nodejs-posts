const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const postsRoutes = require('./routes/posts');
const bookRoutes = require('./routes/books');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/posts', postsRoutes);
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
   res.send('Hello World1234');
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log('connected to db');
});

app.listen(3000);
console.log('was ist hier los?');
