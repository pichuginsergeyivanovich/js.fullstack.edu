"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bodyParser = require('body-parser');
const router = (0, express_1.Router)();
router.post('/login', (req, res) => {
    var _a, _b, _c;
    console.log('req.body=', req.body);
    if (((_a = req.body) === null || _a === void 0 ? void 0 : _a.username) == "sipichugin" && ((_b = req.body) === null || _b === void 0 ? void 0 : _b.password) == "password") {
        const data = { "user": (_c = req.body) === null || _c === void 0 ? void 0 : _c.username };
        const secret = "supersecret";
        const token = jsonwebtoken_1.default.sign(data, secret);
        res.set("Authorization", "Bearer " + token);
        return res.status(200).send("authorization success");
    }
    res.status(401).send('unauthorized');
});
exports.default = router;
