const express = require('express');
const router = express.Router();

const { User } = require('../models/User');

const { auth } = require('../middleware/auth');

const expTime = { expires: new Date(Date.now() + 3600000), httpOnly: true };

router.get('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
    });
});

router.post('/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({
            success: false,
            message: "Taki użytkownik już istnieje"
        });
        return res.status(200).json({
            success: true,
        });
    });
});

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Nieprawidłowy adres email"
            });
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: "Nieprawidłowe hasło"
                });
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie('vod_authExp', expTime);
                res
                    .cookie('vod_auth', user.token, expTime)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id
                    });
            });
        });
    });
});

router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({
            success: false,
            err
        });
        return res.status(200).send({
            success: true,
        });
    });
});

module.exports = router;