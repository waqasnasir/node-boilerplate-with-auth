
import joi from 'joi';

export default (schema) => (req, res, next) => {
  const { error } = joi.validate({ ...req.body, ...req.query }, schema, { abortEarly: false });
  const valid = error == null;
  if (valid) return next();
  const { details } = error;
  const errors = details.map((i) => ({ message: i.message, field: i.context.key }));
  return res.status(422).json(errors);
};
