import Joi from 'joi';

const schemas = {
  signup: Joi.object().keys({
    first: Joi.string().min(3).max(15),
    last: Joi.string().min(3).max(15),
    username: Joi.string().alphanum().min(3).max(30)
      .required(),

    // // email is required
    // email must be a valid email string
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    // phone is required
    // and must be a string of the format XXX-XXX-XXXX
    // where X is a digit (0-9)
    phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/),
  }),
  signin: Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30)
      .required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  }),
  deleteUser: Joi.object().keys({
    id: Joi.number().positive(),
  }),
  updateUser: Joi.object().keys({
    id: Joi.number().positive(),
    first: Joi.string().min(3).max(15),
    last: Joi.string().min(3).max(15),
    username: Joi.string().alphanum().min(3).max(30),

    // // email is required
    // email must be a valid email string
    email: Joi.string().email(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    // phone is required
    // and must be a string of the format XXX-XXX-XXXX
    // where X is a digit (0-9)
    phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/),
  }),
};
export default schemas;
