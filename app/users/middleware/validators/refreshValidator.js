const Joi = require('joi');
const validator = require('../../utils/validate');

const REFRESH_SCHEMA = {
    refreshToken: Joi.string()
        .label('Refresh Token')
        .max(180)
        .required()
};

function refreshValidator(req, res, next) {
    return validator(req.body, REFRESH_SCHEMA)
        .then(() => next())
        .catch(err => next(err));
}
exports.refreshValidator = refreshValidator;