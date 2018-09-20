const tokens = require('../utils/jwt');
const { hashPassword } = require('../utils/hash');
const { registerValidator, checkEmail } = require('../middleware/validators/userValidator');
const sessionService = require('../services/sessionService')
const _ = require('lodash');
const { User } = require('../models/user_model');
const express = require('express');
const router = express.Router();

//user register route
//api/users/
router.post('/', registerValidator, checkEmail, hashPassword, async (req, res) => {

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    user.password = req.hashedPassword;

    const result = await user.save();
    console.log(result);

    const { refreshToken, accessToken } = tokens.generateTokens(result);
    sessionService.createSession(result._id, refreshToken);

    const headers = {
        'x-auth-token': accessToken,
        'x-auth-refreshtoken': refreshToken
    };
    res.header(headers).send(_.pick(user, ['_id', 'name', 'email'])
    );

})


module.exports = router;