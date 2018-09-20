const mongoose = require('mongoose')
const userSession = require('../models/userSession_model');

//create new user session
async function createSession(userId, refreshToken) {
    const usersession = new userSession({
        user_id: userId,
        refreshToken: refreshToken
    })
    await usersession.save();
}

exports.createSession = createSession;


async function deleteSession(refreshToken){
   const result = await userSession.deleteOne({refreshToken : refreshToken})
   console.log("inside deleteSession");
   console.log(result);
}
exports.deleteSession = deleteSession;

//get session by refreshToken

async function getSessionByRefreshToken(refreshToken) {
    const session = await userSession.find({ refreshToken })
    if (!session) {
        res.send("session not maintained for given token")
    }
    return session;
}
exports.getSessionByRefreshToken = getSessionByRefreshToken