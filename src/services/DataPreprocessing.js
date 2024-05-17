export const hasNullValues = (data) => {
  return Object.values(data).some((value) => value === null);
};
