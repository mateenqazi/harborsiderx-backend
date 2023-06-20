import { Request, Response } from 'express';
import { AuthController } from '../modules/auth/auth.controller';
import { UserController } from '../modules/users/user.controller';
import { OptionController } from '../modules/options/option.controller';
import { QuestionController } from '../modules/questions/question.controller';
import { AnswerController } from '../modules/answers/answer.controller';
import { MedicineController } from '../modules/medicines/medicine.controller';

const userController = new UserController();
const authController = new AuthController();
const optionController = new OptionController();
const questionController = new QuestionController();
const answerController = new AnswerController();
const medicineController = new MedicineController();

export const noAuthRoutes = [
  {
    path: '/auth/',
    middleware: [],
    action: authController.routes(),
  },
];

export const AppRoutes = [
  {
    path: '/user/',
    middleware: [],
    action: userController.routes(),
  },
  {
    path: '/questions/',
    middleware: [],
    action: questionController.routes(),
  },
  {
    path: '/options/',
    middleware: [],
    action: optionController.routes(),
  },
  {
    path: '/answers/',
    middleware: [],
    action: answerController.routes(),
  },
  {
    path: '/medicines',
    middleware: [],
    action: medicineController.routes(),
  },
];
