import { Request, Response } from 'express';
import pool from '../database';
import jwt from 'jsonwebtoken';
import helpersValidPassword from '../lib/helpers';
import helpersTimeAgo from '../lib/handlebars';

class AuthController {

  public async register (req:Request, res:Response) {
    const { username, password, fullname } = req.body;
    const newUser = {
      username,
      password,
      fullname
    };
    newUser.password = await helpersValidPassword.encryptPassword(password);
    console.log(newUser);
    await pool.query('INSERT INTO users SET ?', [newUser]);
    res.json({message: 'Usuario Creado'})
  }

  public async login (req:Request, res:Response):Promise<void> {
    const { username, password } = req.body;
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if ( rows.length > 0 ) {
      const user = rows[0];
      console.log(user);
      const validPassword = await helpersValidPassword.matchPassword(password, user.password);
      if (validPassword) {
        const userMy = {
          username,
          password,
        };
        let time = user.created_at;
        let setTime = helpersTimeAgo.timeago(time);
        user['setTime'] = setTime;
        console.log(userMy);
        let timeExpiresIn = '20s';
        jwt.sign({
          user: userMy
        }, 'secretkey', {expiresIn: timeExpiresIn }, (err:any, token:any) => {
              res.json({
                Authorization: {
                  token,
                  expiredIn: timeExpiresIn,
                },
                user: user,
                message: 'Logeado'
              });
        });
      } else {
          res.json({message: 'La contraseña esta mal'});
        }
    } else {
        res.json({message: 'El usuario no existe'})
      }
  }

  public async users (req:any, res:Response) {
    
    await jwt.verify(req.token, 'secretkey', async (err:any, authData:any) => {
      if (err) {
        res.status(403).send({
          message: err.message,
        });
      } else {
          const user = await pool.query('SELECT * FROM users WHERE username = ?', [authData.user.username]);
          console.log(user);
          res.json({
            authData
          });
        }
    });
  }


  public async test (req:Request, res:Response) {
    console.log(req.body);
    // console.log(hola());
    res.json({
      message: 'test'
    });
  }
  // public async posts (req, res) {
  //   jwt.verify(req.token, 'secretkey', (err, authData) => {
  //     if (err) {
  //       res.sendStatus(403);
  //     } else {
  //         res.json({
  //           message: 'post',
  //           authData
  //         });
  //       }
  //   });
  // }

  // public async create (req, res) {
  //   // Mock user
  //   const user = {
  //     id: 1,
  //     username: 'brad',
  //     email: 'brad@gmail.com'
  //   }
  //   jwt.sign({
  //     user: user
  //   }, 'secretkey', {expiresIn: '1d' }, (err, token ) => {
  //     res.json({
  //       token: token 
  //     });
  //   });
  // }

}

const authController = new AuthController();
export default authController;