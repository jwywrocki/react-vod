const express = require('express');
const router = express.Router();

const { User } = require('../models/user');

const { auth } = require('../middleware/auth');

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
    });
});


router.post('/register', (req, res) => {
    const user = new User(req.body);

    user.save((error, doc) => {
        if (error) return res.json({ success: false, error });
        return res.status(200).json({
            success: true,
        });
    });
});

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (error, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Nieprawidłowy adres email"
            });
        user.comparePassword(req.body.password, (error, isMatch) => {
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: "Nieprawidłowe hasło"
                });
            user.generateToken((error, user) => {
                if (error) return res.status(400).send(error);
                res.cookie("vod_authExp", user.tokenExp);
                res
                    .cookie("vod_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (error, doc) => {
        if (error) return res.json({
            success: false,
            error
        });
        return res.status(200).send({
            success: true
        });
    });
});

module.exports = router;