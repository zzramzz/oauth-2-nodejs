const generateAccessToken = require('../utils/jwt');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided');
    try {
        const decoded = jwt.verify(token, config.get('secret'))
        req.user = decoded;
        console.log(decoded)
        next();

    }
    catch (ex) {
        next(ex);
    }



}

// const refreshToken = req.header('x-auth-refreshToken');
//         if(!refreshToken) return res.status(401).send('Access denied. No token provided');
//         if(!validateRefreshToken(refreshToken)) return res.status(400).send("refreshToken Expired.. login again")

//         const decoded = jwt.verify(refreshToken, config.get('refreshTokenSecret'));
//         const accessToken = generateAccessToken(decoded._id) //to be looked later
//         req.accessToken = accessToken;
//         req.user = decoded;
//         next();
