const User = require('../../models/user_model');
const Joi = require('joi');
const validate = require('../../utils/validate');
const bcrypt = require('bcrypt');


const SCHEMA = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
}


function loginValidator(req, res, next) {
    return validate(req.body, SCHEMA)
        .then(() => next())
        .catch(err => next(res.status(400).send(err.details[0].message)));
}
exports.loginValidator = loginValidator;



async function findUserByEmail(req, res, next) {
    try {
        const user = await User.find({ email: req.body.email })
        req.user = user
        next();
    } catch (ex) {
        next(res.status(400).send("Invalid email or password."));
    }
}
exports.findUserByEmail = findUserByEmail;



function attemptLogin(req, res, next) {
    try {
        const validPassword = bcrypt.compare(req.body.password, req.user[0].password);
        next();
    } catch (e) {
        next(res.status(400).send("Ivalid email or password."));
    }
}
exports.attemptLogin = attemptLogin;



