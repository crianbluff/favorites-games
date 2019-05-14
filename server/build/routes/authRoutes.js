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
        this.router.get('/', authController_1.default.list);
        this.router.get('/:id', authController_1.default.getOne);
        this.router.post('/', authController_1.default.create);
        this.router.put('/:id', authController_1.default.update);
        this.router.delete('/:id', authController_1.default.delete);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
