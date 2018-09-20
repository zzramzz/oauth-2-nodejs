const token = require('../utils/jwt');
const sessionService = require('../services/sessionService');

async function authenticateSession(req, res, next) {
    try {
        token.verifyRefreshToken(req.body.refreshToken);
        const session = await sessionService.getSessionByRefreshToken(req.body.refreshToken);
        if (session) {
            req.usersession = session;
            next();
        }
    } catch (ex) {
        next(ex);
    }
}
exports.authenticateSession = authenticateSession;