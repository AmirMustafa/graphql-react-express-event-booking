const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    return res.send('Hello World!');
});

app.listen(3000);