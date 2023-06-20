import { Medicine } from './medicine.model';
import { MedicineType } from './medicine.types';

export class MedicineRepository {
  async getAllMedicines() {
    return await Medicine.query();
  }

  async addMedicine(medicine: Partial<MedicineType>) {
    return await Medicine.query().insert(medicine);
  }

  async addMedicines(medicine: Partial<MedicineType>[]) {
    return await Medicine.query().insert(medicine);
  }
}
