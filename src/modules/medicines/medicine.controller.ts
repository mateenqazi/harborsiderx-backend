import { Router, Request, Response } from 'express';
import { authenticateMiddleware } from '../../middlewares/authMiddleware';
import MedicineService from './medicine.service';

export class MedicineController {
  public router: Router;
  public medicineService = MedicineService;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public getAllMedicines = async (req: Request, res: Response) => {
    const data = await this.medicineService.getAllMedicines();
    res.status(200).json({
      error: false,
      data,
    })
  }

  public addMedicines = async (req: Request, res: Response) => {
    const data = await this.medicineService.addMedicines(req.body);
    res.status(200).json({
      error: false,
      data,
    })
  }


  public routes() {
    this.router.get('/', this.getAllMedicines);
    this.router.post('/add-medicines', this.addMedicines);
    return this.router;
  }
}
