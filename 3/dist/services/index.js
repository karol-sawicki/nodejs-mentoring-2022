"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 {
    // eslint-disable-next-line no-unused-vars
    constructor(db) {
        this.db = db;
    }
    create(user) {
        return this.db.models.User.create(user)
            .then(result => result)
            .catch(err => err);
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map