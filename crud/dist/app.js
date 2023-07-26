"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const bodyParser = require('body-parser');
const passport_1 = __importDefault(require("passport"));
var JwtStrategy = require('passport-jwt').Strategy, ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'supersecret';
opts.issuer = 'pichuginsergeydomain.com';
opts.audience = 'pichuginsergeyaudience.com';
//import helloRouter from './hello.router';
//import authRouter from './auth.router';
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
const port = 3000;
app.use(bodyParser.json());
passport_1.default.use(new JwtStrategy(opts, function (jwt_payload, done) {
    return done(null, jwt_payload);
}));
//app.use("/auth",authRouter);
//app.use("/hello",helloRouter);
const router = (0, express_1.Router)();
//
router.get('/hello', passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    console.log('in passport.authenticate occurs');
    res.send('hello');
});
//curl -H "Content-type: application/json" -d "{\"username\":\"sipichugin\", \"password\":\"password\"}" -X POST http://localhost:3000/login
router.post('/login', (req, res) => {
    var _a, _b, _c;
    console.log('req.body=', req.body);
    if (((_a = req.body) === null || _a === void 0 ? void 0 : _a.username) == "sipichugin" && ((_b = req.body) === null || _b === void 0 ? void 0 : _b.password) == "password") {
        const data = { "user": (_c = req.body) === null || _c === void 0 ? void 0 : _c.username };
        const secret = "supersecret";
        const token = jsonwebtoken_1.default.sign(data, secret);
        console.log("Authorization", "Bearer " + token);
        res.set("Authorization", "Bearer " + token);
        return res.status(200).send("authorization success");
    }
    res.status(401).send('unauthorized');
});
app.use(router);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
