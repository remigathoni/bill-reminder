export const getValue = (name: string, data: any[]) => {
  const categoryData = data.find((obj: { name: string, value: number | null }) => obj.name === name);
  return categoryData;
};
