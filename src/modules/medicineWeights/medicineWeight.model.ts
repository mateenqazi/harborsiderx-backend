import { Model } from 'objection';
import { MedicineWeightType } from './medicineWeight.types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MedicineWeight extends MedicineWeightType {}
// eslint-disable-next-line no-redeclare
export class MedicineWeight extends Model {
  // Table name is the only required property.
  static tableName = 'medicine_weights';
}
