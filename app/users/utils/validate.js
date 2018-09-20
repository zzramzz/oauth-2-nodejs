const Joi = require('joi');

function validate(data, schema) {
  return Joi.validate(data, schema);
  // if(result.error) return res.status(400).send(error.details[0].message)
  // return result;
}

module.exports = validate;