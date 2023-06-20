import { MedicineQuantityRepository } from './medicineQuantity.repository';
import { MedicineQuantityType } from './medicineQuantity.types';

class MedicineService {
  public medicineQuantityRepository: MedicineQuantityRepository;

  constructor() {
    this.medicineQuantityRepository = new MedicineQuantityRepository();
  }

  public addMedicineQuantity = async (medicineQuantity: Partial<MedicineQuantityType>) => {
    return await this.medicineQuantityRepository.addMedicineQuantity(medicineQuantity);
  }
}

export default new MedicineService();
