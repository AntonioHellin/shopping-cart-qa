import { useState } from 'react';

export const PriceCalculator = () => {
  const [quantity, setQuantity] = useState<number | ''>('');
  const [unitPrice, setUnitPrice] = useState<number | ''>('');

  const q = Number(quantity) || 0;
  const p = Number(unitPrice) || 0;
  const total = q * p;

  return (
    <div>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value ? Number(e.target.value) : '')}
        />
      </div>
      <div>
        <label htmlFor="unit-price">Unit Price</label>
        <input
          id="unit-price"
          type="number"
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value ? Number(e.target.value) : '')}
        />
      </div>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
};
