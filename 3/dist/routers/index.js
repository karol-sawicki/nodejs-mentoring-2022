"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const setup_1 = __importDefault(require("./setup"));
exports.default = (app, db) => {
    (0, user_1.default)(app, db);
    (0, setup_1.default)(app);
};
//# sourceMappingURL=index.js.map