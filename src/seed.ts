/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Model } from 'objection';
import fs from 'fs';
import knexConnection from '../knexConnection';
import QuestionService from './modules/questions/question.service';
import OptionService from './modules/options/option.service';
import MedicineWeightService from './modules/medicineWeights/medicineWeight.service';
import MedicineService from './modules/medicines/medicine.service';
import { seedData } from './utils/seedData'
import { MedicineWeightType } from './modules/medicineWeights/medicineWeight.types';
import MedicineQuantityService from './modules/medicineQuantity/medicineQuantity.service';
import { MedicineQuantity } from './modules/medicineQuantity/medicineQuantity.model';
import { MedicineType } from './modules/medicines/medicine.types';

// eslint-disable-next-line import/no-unresolved
const filePath = 'src/seederData/questions.json';

async function addMedicineWeights(weights: Partial<MedicineWeightType>[]) {
  const medicineWeightData = await MedicineWeightService.addMedicineWeights(weights)
  return medicineWeightData;
}

async function addQty(qty: any) {
  const medicineQuantityData = await MedicineQuantityService.addMedicineQuantity(qty)
  return medicineQuantityData;
}

async function addMedicines(
  medicineData: Partial<MedicineType>[],
  qtyData: MedicineQuantity,
  medicinesWeightsData: Partial<MedicineWeightType>,
) {
  const embedMedicineDataOne = { ...medicineData[0], qtyId: qtyData.id, mgId: medicinesWeightsData.id };
  const embedMedicineDataTwo = { ...medicineData[1], qtyId: qtyData.id, mgId: medicinesWeightsData.id };
  await MedicineService.addMedicines([embedMedicineDataOne, embedMedicineDataTwo]);
}

async function seed() {
  Model.knex(knexConnection[process.env.ENV || 'dev']);
  fs.readFile(filePath, 'utf8', async (err, jsonString) => {
    if (err) {
      console.log('File read failed:', err);
      return;
    }
    const questionData = JSON.parse(jsonString);
    for (const item of questionData) {
      const { description, type, options, step } = item;
      const questionExits = await QuestionService.createQuestion({ description, type, step });
      if (type !== 'text') {
        const options1 = options.map((obj: any) => ({ ...obj, question_id: questionExits?.id }));
        await OptionService.createOption(options1);
      }
    }
  });
  const medicinesWeightsData = await addMedicineWeights(seedData.weights);
  const qtyData = await addQty(seedData.qty[0])
  await addMedicines(seedData.medicineData, qtyData, medicinesWeightsData[0]);
}

seed()
  .then(() => console.log('Seed successful'))
  .catch((error) => console.error('Seed failed', error));
