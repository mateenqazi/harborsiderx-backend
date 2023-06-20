import { Router, Request, Response } from 'express';
import { authenticateMiddleware } from '../../middlewares/authMiddleware';
import UserService from './user.service';

export class UserController {
  public router: Router;
  public userService = UserService;

  constructor() {
    this.router = Router();
    this.routes();
  }

  getAllUsers(req: Request, res: Response) {
    const users = [
      {
        email: 'user@example.com',
        name: 'Some merchant',
      },
      {
        email: 'email@example.com',
        name: 'Another merchant',
      },
    ];

    res.statusCode = 200;
    res.send({ users });
  }

  public setUserProfile = async (req: Request, res: Response) => {
    try {
      const { data } = req.user;
      const restObject = req.body;
      const user = await this.userService.updateUser(data?.id, restObject);
      res.status(200).json({
        error: false,
        user,
      });
    } catch (error) {
      res.status(500).send({ error: true, message: error });
    }
  };

  public routes() {
    this.router.get('/', authenticateMiddleware, this.getAllUsers);
    this.router.post('/profile-update', authenticateMiddleware, this.setUserProfile);
    return this.router;
  }
}
