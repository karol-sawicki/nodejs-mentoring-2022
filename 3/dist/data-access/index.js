"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const models_1 = __importDefault(require("./models"));
const seq = new sequelize_1.Sequelize('postgres://karol_sawicki:@localhost:5432/mentoring');
exports.default = seq.authenticate()
    .then(() => {
    console.log('database connected');
    (0, models_1.default)(seq);
    return seq;
}).catch(e => {
    throw e;
});
//# sourceMappingURL=index.js.map