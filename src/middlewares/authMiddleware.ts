import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { BAD_TOKEN, EMAIL_ALREADY_EXIST_MESSAGE } from '../constants';
import userService from '../modules/users/user.service';

export async function authenticateMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req?.user) {
    next();
  } else {
    const { headers } = req;
    const authHeader = headers.authorization;
    if (!authHeader) {
      res.status(401).send({ error: true, message: 'header not set or user logged out' });
      return;
    }
    const token = (authHeader && authHeader.split(' ')[1]) || '';
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET!);
      if (decoded) {
        req.user = decoded;
        next();
      } else {
        res.status(400).json({
          error: true,
          message: "Didn't get loggedIn user",
        });
      }
    } catch (err) {
      res.status(500).send({ error: true, message: BAD_TOKEN });
    }
  }
}

export async function authEmailExistsMiddleware(req: Request, res: Response, next: NextFunction) {
  const user = await userService.getOneUser(req.body.email);
  if (user) {
    res.status(409).send({ message: EMAIL_ALREADY_EXIST_MESSAGE });
  } else {
    next();
  }
}

export async function passportLocalMiddleware(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('local', (err: any, user: any) => {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    }
    if (!user) {
      next();
    }
    if (user) {
      req.user = user;
      next();
    }

    return null;
  })(req, res, next);
}

export async function passportGoogleMiddleware(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('google', async (err: any, user: any) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    if (!user) {
      return res.status(400).send({ message: 'did not find user' });
    }
    if (user) {
      req.user = user;
      next();
    }
    return null;
  })(req, res, next);
}
