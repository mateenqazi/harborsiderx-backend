import { Router, Request, Response } from 'express';
import MedicineWeightService from './medicineQuantity.service';

export class MedicineQuantityController {
  public router: Router;
  public medicineQuantityService = MedicineWeightService;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public addMedicineQuantity = async (req: Request, res: Response) => {
    const data = await this.medicineQuantityService.addMedicineQuantity(req.body);
    res.status(200).json({
      error: false,
      data,
    })
  }


  public routes() {
    this.router.post('/add-weights', this.addMedicineQuantity);
    return this.router;
  }
}
