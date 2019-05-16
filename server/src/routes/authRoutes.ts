import { Router, Request, Response, NextFunction } from 'express';
import authController from '../controllers/authController';

class AuthRoutes {
  
  public router:Router = Router();

  constructor () {
    this.config();
  }

  config ():void {
    this.router.post('/register', authController.register);
    this.router.post('/login', authController.login);
    this.router.get('/user', this.verifyToken, authController.users);
    this.router.get('/test', authController.test);

    // this.router.post('/post/', this.verifyToken, authController.posts);
    // this.router.post('/logins/', authController.create);
  }

  // Format Of Token
  // Authorization Bearer <access_tokn>

  // Verify Token
  verifyToken(req:any, res:Response, next:NextFunction) {
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
    } else {
        // Forbidden
        res.sendStatus(403);
      }
  }

}

const authRoutes = new AuthRoutes();
export default authRoutes.router;