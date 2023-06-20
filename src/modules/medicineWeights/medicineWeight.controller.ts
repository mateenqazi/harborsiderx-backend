import { Router, Request, Response } from 'express';
import MedicineWeightService from './medicineWeight.service';

export class MedicineController {
  public router: Router;
  public medicineWeightService = MedicineWeightService;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public addMedicineWeights = async (req: Request, res: Response) => {
    const data = await this.medicineWeightService.addMedicineWeights(req.body);
    res.status(200).json({
      error: false,
      data,
    })
  }


  public routes() {
    this.router.post('/add-weights', this.addMedicineWeights);
    return this.router;
  }
}
