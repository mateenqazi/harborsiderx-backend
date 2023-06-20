import { MedicineWeight } from './medicineWeight.model';
import { MedicineWeightType } from './medicineWeight.types';

export class MedicineWeightRepository {
  async addMedicineWeights(medicineWeights: Partial<MedicineWeightType>[]) {
    return await MedicineWeight.query().insert(medicineWeights).returning('*');
  }
}
