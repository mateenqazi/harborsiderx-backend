import { Router, Request, Response } from 'express';
// import { authenticateMiddleware } from '../../middlewares/authMiddleware';
import QuestionService from './question.service';
import { authenticateMiddleware } from '../../middlewares/authMiddleware';

export class QuestionController {
  public router: Router;
  public questionService = QuestionService;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public getAllQuestions = async (req: Request, res: Response) => {
    try {
      const { data } = req.user;
      const questions = await this.questionService.getAllQuestion(data?.id);
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  };

  public createQuestions = async (req: Request, res: Response) => {
    try {
      const token = await this.questionService.createQuestion([{}]);
      res.status(200).json({
        token,
      });
    } catch (error) {
      res.status(500).send({ message: error });
    }
  };

  public routes() {
    this.router.post('/get-questions', authenticateMiddleware, this.getAllQuestions);
    return this.router;
  }
}
