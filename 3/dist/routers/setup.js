"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.use((req, res, next) => {
        res.status(400).json({ error: 'Not found' });
    });
};
//# sourceMappingURL=setup.js.map