import { MedicineWeightRepository } from './medicineWeight.repository';
import { MedicineWeightType } from './medicineWeight.types';

class MedicineService {
  public medicineWeightRepository: MedicineWeightRepository;

  constructor() {
    this.medicineWeightRepository = new MedicineWeightRepository();
  }

  public addMedicineWeights = async (medicines: Partial<MedicineWeightType>[]) => {
    return await this.medicineWeightRepository.addMedicineWeights(medicines);
  }
}

export default new MedicineService();
