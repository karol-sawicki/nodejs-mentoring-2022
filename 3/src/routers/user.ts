import {
  Express,
  json,
  Request,
  Response,
  Router,
} from 'express';
import { Sequelize } from 'sequelize';
import validateUserCreation from './middlewares/validateUserCreation';
import UserService from '../services/userService';

export default (app: Express, db: Sequelize) => {
  const route = Router();
  const Users = db.models.User;
  const userService = new UserService(db);
  app.use('/users', route);

  route.use(json());
  route.use((req, res, next) => {
    res.set('Content-Type', 'application/json');
    next();
  });

  route.get('/', (req: Request, res: Response) => {
    console.log('/users/ route');
    res.json({ halko: 'centralko' });
  });

  route.get('/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await Users.findAll({ where: { id: userId }, raw: true });

    if (!user.length) {
      return res.json({ message: 'User not found' });
    }
    return res.json(user);
  });

  route.post('/limit/:limit', async (req, res) => {
    const limit = parseInt(req.params.limit, 10);
    const login = req.body.login ?? '';

    const users = await Users.findAll({
      where: {
        login,
      },
      raw: true,
      limit,
    });

    if (!users.length) {
      return res.json({ message: 'No users found' });
    }

    return res.json(users);
  });

  route.put('/create', validateUserCreation);
  route.put('/create', async (req, res) => {
    const newUser = req.body;

    userService.create(newUser)
      .then(resultUser => res.json(resultUser))
      .catch(err => res.json(JSON.stringify(err)));
  });
};
