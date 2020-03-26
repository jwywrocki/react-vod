const { User } = require('../models/User');

const auth = async (req, res, next) => {
    let token = req.cookies.vod_auth;

    await User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user)
            return res.json({
                isAuth: false,
                error: true,
            });

        req.token = token;
        req.user = user;
        next();
    });
};

module.exports = { auth };