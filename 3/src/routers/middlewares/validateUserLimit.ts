import Joi from 'joi';

const limitSchema = Joi.object().keys({
  login: Joi.string().alphanum().min(3).max(100).required(),
}).strict();

export default (req, res, next) => {
  const result = limitSchema.validate(req.body);
  if (result.error) {
    console.log('validation error');
    return res.status(400)
      .json({ message: `validation error: ${result.error}` });
  }
  next();
};
