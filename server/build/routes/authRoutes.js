"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/register', authController_1.default.register);
        this.router.post('/login', authController_1.default.login);
        this.router.get('/user', this.verifyToken, authController_1.default.users);
        this.router.get('/test', authController_1.default.test);
        // this.router.post('/post/', this.verifyToken, authController.posts);
        // this.router.post('/logins/', authController.create);
    }
    // Format Of Token
    // Authorization Bearer <access_tokn>
    // Verify Token
    verifyToken(req, res, next) {
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        // Check if bearer is undefined
        if (typeof bearerHeader !== 'undefined') {
            // Split at the space
            const bearer = bearerHeader.split(' ');
            // Get token from array
            const bearerToken = bearer[1];
            // Set the token
            req.token = bearerToken;
            // Next middleware
            next();
        }
        else {
            // Forbidden
            res.sendStatus(403);
        }
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
