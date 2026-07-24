export const calculateTax = (amount: number, rate: number): number => {
  return amount * (rate / 100);
};
