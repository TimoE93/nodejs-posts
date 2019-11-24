const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const postsRoutes = require('./routes/posts');
const bookRoutes = require('./routes/books');
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(bodyParser.json());
app.use('/posts', postsRoutes);
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
   res.send('Hello World1234');
});

app.get('/test', async (req, res ) => {
    const urls = [
        'https://vegconomist.com/wp-json/wp/v2/posts?per_page=1',
        'https://utopia.de/wp-json/wp/v2/posts?per_page=1',
        'https://utopia.org/wp-json/wp/v2/posts?per_page=1'
    ];

    const urls_get = await urls.map(url => axios.get(url));
    axios.all(urls_get)
        .then(axios.spread(function (...responses) {
            let data = [];
            responses.forEach((response, index) => {
                data[index] = response.data;
            });
            res.json(data);
        }));
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log('connected to db');
});

app.listen(3000);
