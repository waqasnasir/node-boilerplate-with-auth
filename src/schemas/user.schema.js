import Joi from 'joi';

const schemas = {
  signup: Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30)
      .required(),

    // // email is required
    // email must be a valid email string
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    // phone is required
    // and must be a string of the format XXX-XXX-XXXX
    // where X is a digit (0-9)
    phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),

    // birthday is not required
    // birthday must be a valid ISO-8601 date
    // dates before Jan 1, 2014 are not allowed
    birthday: Joi.date().max('1-1-2004').iso(),
  }),
  signin: Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30)
      .required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  })
};
export default schemas;
