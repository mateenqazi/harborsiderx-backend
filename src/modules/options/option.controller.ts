import { Router, Request, Response } from 'express';
// import { authenticateMiddleware } from '../../middlewares/authMiddleware';
import UserService from '../users/user.service';
import OptionService from './option.service';

export class OptionController {
  public router: Router;
  public userService = UserService;
  public optionService = OptionService;

  constructor() {
    this.router = Router();
    this.routes();
  }

  // public loginIn = async (req: Request, res: Response) => {
  //   try {
  //     const token = await this.userService.loginUserLocally(req.user.id);
  //     res.status(200).json({
  //       token,
  //     });
  //   } catch (error) {
  //     res.status(500).send({ message: error });
  //   }
  // };

  public createOption = async (req: Request, res: Response) => {
    try {
      const data = {
        description: '',
        question_id: 1,
      };
      const token = await this.optionService.createOption(data);
      res.status(200).json({
        token,
      });
    } catch (error) {
      res.status(500).send({ message: error });
    }
  };

  public routes() {
    // this.router.post('/login', authenticateMiddleware, this.loginIn);
    return this.router;
  }
}
