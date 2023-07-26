"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser = require('body-parser');
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.get('/posts/list', passport_1.default.authenticate('jwt', { session: 'false' }), (req, res) => {
    console.log('list request arrived');
    res.send('/posts/list request arrived.');
});
exports.default = router;
