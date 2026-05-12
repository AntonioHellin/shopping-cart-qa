# Lesson 16 start — Modelo A v2

This commit is the state **before** running the recorded prompt for lesson 16.

Construction rule: start from the original lesson result context, remove the prompt result, and preserve required preconditions/fixtures.
Source base snapshot: a41f099
Topic: sentry performance

## Lesson notes
- Si la prompt dice `calculateTotal/cart-operations.ts`, el equivalente existente es `src/shared/utils/calculateSubtotal.ts`.
- Si la prompt dice `CartContext`, en esta versión el owner de agregar al carrito está en `src/App.tsx` (`handleAddToCart`).
