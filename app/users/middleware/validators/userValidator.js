const Joi = require('joi');
const {User} = require('../../models/user_model');
const validate = require('../../utils/validate')

const REGISTER_SCHEMA = {
    name: Joi.string().min(3).max(55).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
}

function registerValidator(req, res, next) {
    return validate(req.body, REGISTER_SCHEMA)
        .then(() => next())
        .catch(err => next(res.status(400).send(err.details[0].message)));
}

exports.registerValidator = registerValidator;

async function checkEmail(req, res, next){
     const user = await User.findOne({email : req.body.email});
     if (user) return res.status(400).send("User already registered.")
     next();
}
exports.checkEmail = checkEmail;
