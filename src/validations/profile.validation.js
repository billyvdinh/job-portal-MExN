const Joi = require('joi');
const { password } = require('./custom.validation');

const updateProfile = {
  body: Joi.object()
    .keys({
      name: Joi.string(),
      email: Joi.string().email(),
      cur_password: Joi.string().custom(password),
      old_password: Joi.string().custom(password),
    })
    .min(1),
};

module.exports = {
  updateProfile,
};
