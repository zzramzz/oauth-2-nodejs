const { loginValidator, findUserByEmail, attemptLogin } = require('../middleware/validators/loginValidator')
const { refreshValidator } = require('../middleware/validators/refreshValidator')
const { authenticateSession } = require('../middleware/session')
const sessionService = require('../services/sessionService')
const tokens = require('../utils/jwt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();


//api/login/
router.post('/', loginValidator, findUserByEmail, attemptLogin, async (req, res) => {

  const { refreshToken, accessToken } = tokens.generateTokens(req.user[0]);
  sessionService.createSession(req.user[0]._id, refreshToken);
  const headers = {
    'x-auth-token': accessToken,
    'x-auth-refreshtoken': refreshToken
  };
  res.header(headers).send(_.pick(req.user[0], ['_id', 'name', 'email']))
})



//api/login/refresh
//route to get accesstoken after it is expired
router.post('/refresh', refreshValidator, authenticateSession, (req, res, next) => {

  try {
    const accessToken = tokens.generateAccessToken(req.usersession[0].user_id);
    res.header('x-auth-token', accessToken).send('token refreshed');
  } catch (e) {
    next(e);
  }
});



module.exports = router;