"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const creationSchema = joi_1.default.object().keys({
    // eslint-disable-next-line newline-per-chained-call
    login: joi_1.default.string().alphanum().min(3).max(100).required(),
    password: joi_1.default.string().regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/).required(),
    age: joi_1.default.number().min(4).max(130).required(),
}).strict();
exports.default = (req, res, next) => {
    const result = creationSchema.validate(req.body);
    if (result.error) {
        return res.status(400)
            .json({ message: `validation error: ${result.error}` });
    }
    next();
};
//# sourceMappingURL=validateUserCreation.js.map