"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = __importDefault(require("../lib/helpers"));
const handlebars_1 = __importDefault(require("../lib/handlebars"));
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, fullname } = req.body;
            const newUser = {
                username,
                password,
                fullname
            };
            newUser.password = yield helpers_1.default.encryptPassword(password);
            console.log(newUser);
            yield database_1.default.query('INSERT INTO users SET ?', [newUser]);
            res.json({ message: 'Usuario Creado' });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const rows = yield database_1.default.query('SELECT * FROM users WHERE username = ?', [username]);
            if (rows.length > 0) {
                const user = rows[0];
                console.log(user);
                const validPassword = yield helpers_1.default.matchPassword(password, user.password);
                if (validPassword) {
                    const userMy = {
                        username,
                        password,
                    };
                    let time = user.created_at;
                    let setTime = handlebars_1.default.timeago(time);
                    user['setTime'] = setTime;
                    console.log(userMy);
                    let timeExpiresIn = '20s';
                    jsonwebtoken_1.default.sign({
                        user: userMy
                    }, 'secretkey', { expiresIn: timeExpiresIn }, (err, token) => {
                        res.json({
                            Authorization: {
                                token,
                                expiredIn: timeExpiresIn,
                            },
                            user: user,
                            message: 'Logeado'
                        });
                    });
                }
                else {
                    res.json({ message: 'La contraseña esta mal' });
                }
            }
            else {
                res.json({ message: 'El usuario no existe' });
            }
        });
    }
    users(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield jsonwebtoken_1.default.verify(req.token, 'secretkey', (err, authData) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    res.status(403).send({
                        message: err.message,
                    });
                }
                else {
                    const user = yield database_1.default.query('SELECT * FROM users WHERE username = ?', [authData.user.username]);
                    console.log(user);
                    res.json({
                        authData
                    });
                }
            }));
        });
    }
    test(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            // console.log(hola());
            res.json({
                message: 'test'
            });
        });
    }
}
const authController = new AuthController();
exports.default = authController;
