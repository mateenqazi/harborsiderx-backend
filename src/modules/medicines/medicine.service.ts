import { MedicineRepository } from './medicine.repository';
import { MedicineType } from './medicine.types';

class MedicineService {
  public medicineRepository: MedicineRepository;

  constructor() {
    this.medicineRepository = new MedicineRepository();
  }

  public getAllMedicines = async () => {
    return await this.medicineRepository.getAllMedicines();
  };

  public addMedicine = async (medicine: Partial<MedicineType>) => {
    return await this.medicineRepository.addMedicine(medicine);
  }

  public addMedicines = async (medicines: Partial<MedicineType>[]) => {
    return await this.medicineRepository.addMedicines(medicines);
  }
}

export default new MedicineService();
