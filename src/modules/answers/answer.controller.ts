import { Router, Request, Response } from 'express';
// import { authenticateMiddleware } from '../../middlewares/authMiddleware';
import AnswerService from './answer.service';
import { authenticateMiddleware } from '../../middlewares/authMiddleware';

export class AnswerController {
  public router: Router;
  public answerService = AnswerService;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public getAllQuestions = async (req: Request, res: Response) => {
    try {
      const questions = await this.answerService.getAllAnswers();
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  };

  public getAllAnswersSpecificUser = async (req: Request, res: Response) => {
    try {
      const questions = await this.answerService.getAllAnswerForSpecificUser();
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  };

  public createAnswers = async (req: Request, res: Response) => {
    try {
      const { data } = req.user;
      const token = await this.answerService.createAnswer(data?.id, req.body);
      res.status(200).json({
        token,
      });
    } catch (error) {
      res.status(500).send({ message: error });
    }
  };

  public routes() {
    this.router.post('/save-answers', authenticateMiddleware, this.createAnswers);
    return this.router;
  }
}
