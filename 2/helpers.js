import { promises } from 'fs';
import Joi from 'joi';

export function findUser(users, id) {
  return users.find(usr => usr.id === id);
}

export function findUserIndex(users, id) {
  return users.findIndex(usr => usr.id === id);
}

export function findUsers(users, login) {
  return users.filter(usr => usr.login.indexOf(login) !== -1);
}

export function nextId(users) {
  if (!users.length) {
    return '1';
  }
  return String(parseInt(users[users.length - 1]['id']) + 1);
}

export async function saveUsers(users) {
  return promises.writeFile('./users.json', JSON.stringify(users));
}

const creationSchema = Joi.object().keys({
  login: Joi.string().alphanum().min(3).max(100).required(),
  password: Joi.string().regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/).required(),
  age: Joi.number().min(4).max(130).required()
}).strict();

const updateSchema = Joi.object().keys({
  id: Joi.string().regex(/^\d+$/).required(),
  login: Joi.string().alphanum().min(3).max(100),
  password: Joi.string().regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/),
  age: Joi.number().min(4).max(130)
}).strict();

export function validateUpdateUserJSON(req, res, next) {
  const result = updateSchema.validate(req.body);
  if (result.error) {
    return res.status(400)
              .json({ message: `validation error: ${result.error}` });
  }
  next();
}

export function validateCreateUserJSON(req, res, next) {
  const result = creationSchema.validate(req.body);
  if (result.error) {
    return res.status(400)
              .json({ message: `validation error: ${result.error}` });
  }
  next();
}
