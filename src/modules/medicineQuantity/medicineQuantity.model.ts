import { Model } from 'objection';
import { MedicineQuantityType } from './medicineQuantity.types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MedicineQuantity extends MedicineQuantityType {}
// eslint-disable-next-line no-redeclare
export class MedicineQuantity extends Model {
  // Table name is the only required property.
  static tableName = 'quantities';
}
