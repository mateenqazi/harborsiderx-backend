import { Model } from 'objection';
import { MedicineType } from './medicine.types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Medicine extends MedicineType {}
// eslint-disable-next-line no-redeclare
export class Medicine extends Model {
  // Table name is the only required property.
  static tableName = 'medicines';
}
