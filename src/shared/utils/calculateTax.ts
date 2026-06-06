export const calculateTax = (amount: number, taxRate: number): number => {
  return amount * (taxRate / 100);
};
