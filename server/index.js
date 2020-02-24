const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

const { User } = require('./models/user');

const { auth } = require('./middleware/auth');

const connect = mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Połączono z MongoDB'))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({ "Hello!": "Mój pierwszy deploy na heroku." });
});

app.get("/api/users/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
    });
});


app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
            userData: doc
        });
    });
});

app.post('/api/users/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Błędny adres email"
            });
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: "Błędne hasło"
                });
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res
                    .cookie("vod_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true
                    });
            });
        });
    });
});

app.get("/api/user/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
        if (err) return res.json({
            success: false,
            err
        })
        return res.status(200).send({
            success: true
        });
    });
});

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('Serwer działa na porcie:', port)
});