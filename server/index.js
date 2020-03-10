const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const config = require('./config/key');

const mongoose = require('mongoose');

const mongoOptiopns =
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
};
mongoose.connect(config.mongoURI, mongoOptiopns)
    .then(() => console.log('Połączono z MongoDB'))
    .catch(error => console.log(error));

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));

if (process.env.NODE_ENV === "production") {

    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('Serwer działa na porcie:', port)
});