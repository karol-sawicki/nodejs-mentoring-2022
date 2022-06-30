import Joi from 'joi';

const updateSchema = Joi.object().keys({
  id: Joi.string().regex(/^\d+$/).required(),
  login: Joi.string().alphanum().min(3).max(100),
  password: Joi.string().regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/),
  age: Joi.number().min(4).max(130)
}).strict();

export default (req, res, next) => {
  const result = updateSchema.validate(req.body);
  if (result.error) {
    return res.status(400)
              .json({ message: `validation error: ${result.error}` });
  }
  req.user = req.body;
  next();
}
