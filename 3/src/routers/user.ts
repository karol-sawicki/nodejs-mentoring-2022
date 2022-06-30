import e, {
  Express,
  json,
  Request,
  Response,
  Router,
} from 'express';
import { Sequelize } from 'sequelize';
import validateUserCreation from './middlewares/validateUserCreation';
import validateUserUpdate from './middlewares/validateUserUpdate';
import UserService from '../services/userService';
import validateUserLimit from './middlewares/validateUserLimit';


export default (app: Express, db: Sequelize) => {
  const route = Router();
  const Users = db.models.User;
  const userService = new UserService(db);
  app.use("/users", route);

  route.use(json());
  route.use((req, res, next) => {
    res.set("Content-Type", "application/json");
    next();
  });

  route.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const user = await userService.findUsers({ id });

      if (!user.length) {
        return res.json({ message: `User with ID=${id} not found` });
      }

      return res.json(user);
    } catch (err) {
      res.json(JSON.stringify(err));
    }
  });

  route.post('/limit/:limit', validateUserLimit);
  route.post("/limit/:limit", async (req, res) => {
    const limit = parseInt(req.params.limit, 10);
    const login = req.body.login;

    try {
      const users = await userService.findUsers(
        { login },
        { limit }
      );
  
      if (!users.length) {
        return res.json({ message: "No users found" });
      }
  
      return res.json(users);
    } catch (err) {
      res.json(JSON.stringify(err));
    }
  });

  route.put("/create", validateUserCreation);
  route.put("/create", async (req, res) => {
    const newUser = req.body;

    try {
      const result = await userService.create(newUser);
      res.json(result);
    } catch (err) {
      res.json(JSON.stringify(err));
    }
  });

  route.put('/update', validateUserUpdate);
  route.put('/update', async (req: any, res) => {
    const newUser = req.user;
    try {
      const result = await userService.updateUser(newUser);
      res.json({ success: !!result[0] });
    } catch (err) {
      res.json(JSON.stringify(err));
    }

  });

  route.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const result = await userService.deleteUser(id);
      res.json({ success: !!result[0] });
    } catch (err) {
      res.json(JSON.stringify(err));
    }
  });
};
