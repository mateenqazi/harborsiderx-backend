import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import passport from 'passport';
import UserService from '../users/user.service';
import { userSignUpSchema } from '../users/user.types';
import { BAD_TOKEN, EMAIL_ALREADY_EXIST_MESSAGE, GOOGLE_USERS_EXISTS } from '../../constants';
import { passportGoogleMiddleware, passportLocalMiddleware } from '../../middlewares/authMiddleware';

export class AuthController {
  public router: Router;
  public userService = UserService;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public getAuthUser = async (
    req: Request,
    res: Response,
  ) => {
    if (req.user) {
      const { password, ...rest } = req.user;
      res.status(200).json({
        error: false,
        message: 'Successfully Logged In',
        user: rest,
      });
    } else {
      const { headers } = req;
      const authHeader = headers.authorization;
      if (!authHeader) {
        res.status(401).send({ error: true, message: 'Header not set or user logged out' });
        return;
      }
      const token = (authHeader && authHeader.split(' ')[1]) || '';
      try {
        const decoded: any = await jwt.verify(
          token,
          process.env.JWT_SECRET!,
        );
        try {
          if (decoded) {
            /* eslint-disable-next-line no-unsafe-optional-chaining */
            const { password, ...rest } = decoded?.data;
            res.status(200).json({
              error: false,
              message: 'Successfully Logged In',
              user: { ...rest },
            });
          } else {
            res.status(400).json({
              error: true,
              message: "Token didn't verify",
            });
          }
        } catch (error) {
          res.status(400).json({
            error: true,
            message: 'Error occurred in decoding token',
          });
        }
      } catch (err) {
        res.status(500).send({ error: true, message: BAD_TOKEN });
      }
    }
  }

  public register = async (req: Request, res: Response, next: NextFunction) => {
    const isGoogleUser = await this.userService.getOneUser(req.body.email)
    if (isGoogleUser?.type === 'google') {
      res.status(400).send({
        message: GOOGLE_USERS_EXISTS,
      })
    } else if (isGoogleUser?.type === 'local') {
      res.status(400).send({
        message: EMAIL_ALREADY_EXIST_MESSAGE,
      })
    } else {
      const user = await this.userService.addUser({
        email: req.body.email,
        password: req.body.password,
        type: 'local',
      });
      const { password, ...restObject } = user
      const token = await this.userService.loginUserLocally(restObject);
      res.status(200).json({
        error: false,
        token,
      })
    }
  };

  public loginIn = async (req: Request, res: Response) => {
    try {
      const { password, ...restObject } = req.user
      const token = await this.userService.loginUserLocally(restObject);
      res.status(200).json({
        error: false,
        token,
      })
    } catch (error) {
      res.status(500).send({ error: true, message: error });
    }
  };

  public logout = async (req: Request, res: Response) => {
    // @typescript-eslint/no-empty-function
    req.logout(() => undefined);
    res.status(200).json({
      error: false,
      message: 'User logged out successfully',
    });
  }

  public failedLogin = async (req: Request, res: Response) => {
    res.status(401).json({
      error: true,
      message: 'Log in failure',
    });
  }

  public redirect = async (req: Request, res: Response) => {
    try {
      const { password, ...restObject } = req.user
      const token = await this.userService.loginUserByGoogle(restObject);
      res.status(200).redirect(`${process.env.CLIENT_URL}profile?sid=${token}`)
    } catch (error) {
      res.status(500).send({ error: true, message: error });
    }
  }

  public routes() {
    // getting auth user with token or session based approach
    this.router.get('/getAuthUser', this.getAuthUser);

    // local passport auth routes
    this.router.post('/register', this.register);
    this.router.post('/login', passportLocalMiddleware, this.loginIn);

    // passport google auth routes
    this.router.get('/google/authenticate', passport.authenticate('google', { scope: ['email', 'profile'] }))
    this.router.get('/google/callback', passportGoogleMiddleware, this.redirect);

    // redirect or logout routes
    this.router.get('/login/failed', this.failedLogin);
    this.router.get('/logout', this.logout);
    return this.router;
  }
}
