const Joi = require('joi')

const username = Joi.string()
                    .regex(/^[a-z]+$/, 'alpha').message('hanya boleh huruf')
                    .required()
const password = Joi.string().pattern(/^[0-9]+$/, 'numbers').required()
const email = Joi.string().email().required()
const date_birth = Joi.date().required()

module.exports = {
  username,
  password,
  email,
  date_birth
}

