
const jwt = require('jsonwebtoken');
const config = require('config');


function generateTokens(user) {

    const refreshToken = jwt.sign({ _id: user._id }, config.get('refreshTokenSecret'), { expiresIn: '7d' });
    const accessToken = jwt.sign({ _id: user._id }, config.get('secret'), { expiresIn: '1m' });
    return {
        refreshToken,
        accessToken
    }
}

exports.generateTokens = generateTokens;


function generateAccessToken(userId) {

    return jwt.sign({ _id: userId }, config.get('secret'), { expiresIn: '1m' });
}

exports.generateAccessToken = generateAccessToken;

function generateRefreshToken(user) {
    console.log(user._id);
    return jwt.sign({ _id: user._id }, config.get('refreshTokenSecret'), { expiresIn: '7d' });
}

exports.generateRefreshToken = generateRefreshToken;

function verifyAccessToken(token) {
    try {
        return jwt.verify(token, config.get('secret'))
    }
    catch (ex) {
        return ex;
    }
}
exports.verifyAccessToken = verifyAccessToken;


function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, config.get('refreshTokenSecret'))
    }
    catch (ex) {
        return ex;
    }
}
exports.verifyRefreshToken = verifyRefreshToken

