type SafeValue = string | number | boolean | null;

export const createRecord = <T extends Record<string, SafeValue>>(
  data: T[],
  newRecord: T,
  idKey: keyof T
): T[] => {
  const exists = data.some((record) => record[idKey] === newRecord[idKey]);
  if (exists) return data; // skip if duplicate
  return [...data, newRecord];
};

export const updateRecord = <T extends Record<string, SafeValue>>(
  data: T[],
  updatedRecord: T,
  idKey: keyof T
): T[] => {
  return data.map((record) =>
    record[idKey] === updatedRecord[idKey]
      ? { ...record, ...updatedRecord }
      : record
  );
};
