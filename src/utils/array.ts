/**
 * Removes duplicate values from an array
 * @param array Array to dedupe
 * @internal
 */
export const dedupe = <T>(array: T[]) => Array.from(new Set(array));

/**
 * Removes undefiend and null values from an array
 * @remarks Does not remove empty strings
 * @param array Array to remove empty values
 * @internal
 */
export const removeEmpty = <T>(array: T[]) =>
  array.filter((value) => value !== null && value !== undefined);

/**
 * Removes duplicate and empty values from an array
 * @param array Array to remove empty and duplicate values
 * @internal
 */
export const removeEmptyAndDedupe = <T>(array: T[]) => {
  const noEmptyValues = removeEmpty(array);
  return dedupe(noEmptyValues);
};

/**
 * Chunks a single array into multiple arrays
 * @param array Array to dedupe
 * @param chunkSize Size of each chunk
 * @internal
 */
export const chunk = <T>(array: T[], chunkSize = 100) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};
