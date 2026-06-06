export interface CartItem {
  price: number;
  quantity: number;
}

export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
