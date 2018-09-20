const {refreshValidator} = require('../middleware/validators/refreshValidator');
const { authenticateSession } = require('../middleware/session');
const sessionService = require('../services/sessionService');
const router = require('express').Router();

router.post('/', refreshValidator, authenticateSession, (req, res) => {
    console.log(req.usersession)
    try{    
        sessionService.deleteSession(req.usersession[0].refreshToken);
        res.status(200).send("logged out successfully");
    }catch(ex){
        res.status(404).send(ex);
    }
})
module.exports =router;