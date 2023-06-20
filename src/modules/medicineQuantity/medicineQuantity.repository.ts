import { MedicineQuantity } from './medicineQuantity.model';
import { MedicineQuantityType } from './medicineQuantity.types';

export class MedicineQuantityRepository {
  async addMedicineQuantity(medicineQuantity: Partial<MedicineQuantityType>) {
    return await MedicineQuantity.query().insert(medicineQuantity).returning('*');
  }
}
