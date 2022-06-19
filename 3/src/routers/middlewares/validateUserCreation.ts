import Joi from 'joi';

const creationSchema = Joi.object().keys({
  // eslint-disable-next-line newline-per-chained-call
  login: Joi.string().alphanum().min(3).max(100).required(),
  password: Joi.string().regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/).required(),
  age: Joi.number().min(4).max(130).required(),
}).strict();

export default (req, res, next) => {
  const result = creationSchema.validate(req.body);
  if (result.error) {
    return res.status(400)
      .json({ message: `validation error: ${result.error}` });
  }
  next();
};
