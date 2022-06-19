"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateUserCreation_1 = __importDefault(require("./middlewares/validateUserCreation"));
const userService_1 = __importDefault(require("../services/userService"));
exports.default = (app, db) => {
    const route = (0, express_1.Router)();
    const Users = db.models.User;
    const userService = new userService_1.default(db);
    app.use('/users', route);
    route.use((0, express_1.json)());
    route.use((req, res, next) => {
        res.set('Content-Type', 'application/json');
        next();
    });
    route.get('/', (req, res) => {
        console.log('/users/ route');
        res.json({ halko: 'centralko' });
    });
    route.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.id;
        const user = yield Users.findAll({ where: { id: userId }, raw: true });
        if (!user.length) {
            return res.json({ message: 'User not found' });
        }
        return res.json(user);
    }));
    route.post('/limit/:limit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const limit = parseInt(req.params.limit, 10);
        const login = (_a = req.body.login) !== null && _a !== void 0 ? _a : '';
        const users = yield Users.findAll({
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
    }));
    route.put('/create', validateUserCreation_1.default);
    route.put('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = req.body;
        userService.create(newUser)
            .then(resultUser => res.json(resultUser))
            .catch(err => res.json(JSON.stringify(err)));
    }));
};
//# sourceMappingURL=user.js.map