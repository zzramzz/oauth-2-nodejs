const bcrypt = require('bcrypt');

async function hashPassword(req, res, next) {
    try{
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(req.body.password, salt);
        req.hashedPassword = password;
        next();
    }catch(ex){
        next(ex)
    }
}

exports.hashPassword = hashPassword;