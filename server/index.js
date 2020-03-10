const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

const mongoose = require('mongoose');

const connect = mongoose.connect(config.mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        seCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('Połączono z MongoDB'))
    .catch(err => console.log(err));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('Serwer działa na porcie:', port)
});