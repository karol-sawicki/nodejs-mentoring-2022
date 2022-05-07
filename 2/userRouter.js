import { 
  findUser, 
  findUserIndex, 
  findUsers, 
  nextId,
  saveUsers, 
  validateCreateUserJSON, 
  validateUpdateUserJSON } from './helpers.js';
import { Router, json } from 'express';
import { USERS } from './task1.js';

const userRouter = Router();
export default userRouter;

userRouter.use(json());
userRouter.use((req, res, next) => {
  res.set('Content-Type', 'application/json');
  next();
});

userRouter.get('/:id', (req, res) => {
  const userId = req.params.id;
  const user = findUser(USERS, userId);

  if (!user) {
    return res.json({ message: 'User not found' });
  }

  return res.json(user);
});

userRouter.post('/limit/:limit', (req, res) => {
  const limit = req.params.limit;
  const login = req.body.login ?? '';

  const users = findUsers(USERS, login);

  if (!users.length) {
    return res.json({ message: 'No users found' });
  }

  const resultUsers = users.sort((a, b) => a.login.localeCompare(b.login))
                            .slice(0, limit);

  return res.json(resultUsers);
});

userRouter.put('/create', validateCreateUserJSON);
userRouter.put('/create', async (req, res) => {
  const newUser = {
    id: nextId(USERS),
    isDeleted: false,
    ...req.body
  };
  USERS.push(newUser);
  
  try {
    await saveUsers(USERS);
  } catch (err) {
    return res.json({ message: `Creating new user failed: ${err.message}` });
  }
  
  return res.json(newUser);
});

userRouter.put('/update', validateUpdateUserJSON);
userRouter.put('/update', async (req, res) => {
  const newUser = req.body;
  const userIndex = findUserIndex(USERS, newUser.id);

  if (userIndex === -1) {
    return res.json({ message: 'No user found' });
  }

  USERS[userIndex] = {
    ...USERS[userIndex],
    ...newUser
  }

  try {
    await saveUsers(USERS);
  } catch (err) {
    return res.json({ message: `Server error, user not updated: ${err}` });
  }

  return res.json(USERS[userIndex]);
});

userRouter.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  const userIndex = findUserIndex(USERS, userId);

  if (userIndex === -1) {
    return res.json({ message: 'User not found' });
  }

  USERS[userIndex]['isDeleted'] = true;

  try {
    await saveUsers(USERS);
  } catch (err) {
    return res.json({ message: `Server error, user not deleted: ${err}` });
  }
  return res.json(USERS[userIndex]);
});
