import csv from 'csvtojson';
import internal from 'stream';

/**
 * Converts a readable stream of a CSV file into JSON
 * @param csvStream Readable stream of a CSV file
 * @param delimiter Delimiter token such as ',' or '|'. Defaults to comma
 * @returns Promise containing an array of records from the CSV file
 */
// eslint-disable-next-line no-undef
export const csvStreamToJSON = async <Res>(csvStream: internal.Readable, delimiter = ',') => {
  const json = (await csv({ delimiter }).fromStream(csvStream)) as Res[];
  return json;
};

/**
 * Streams a CSV file record by record for effecient memory usage
 * @param csvStream Readable stream of a CSV file
 * @param operateOnRecord Function to perform on each record
 * @param delimiter Delimiter token such as ',' or '|'. Defaults to comma
 */
export const streamCSVByRecord = <RecordObject extends Record<string, string>>(
  csvStream: internal.Readable,
  operateOnRecord: (record: RecordObject) => void,
  delimiter = ',',
) => {
  const converter = csv({ delimiter }).fromStream(csvStream);
  converter.subscribe((recordObj) => {
    return operateOnRecord(recordObj);
  });
  return new Promise<void>((resolve, reject) => {
    converter.on('done', (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};
