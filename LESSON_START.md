# Lesson 04 start — Modelo A v2

This commit is the state **before** running the recorded prompt for lesson 04.

Construction rule: start from the original lesson result context, remove the prompt result, and preserve required preconditions/fixtures.
Source base snapshot: 60b1d19
Topic: e2e testing

## Lesson notes
- Playwright queda instalado/configurado como precondición.
- Si la grabación menciona botón “E-commerce Demo”, en esta entrega la app ya abre directamente el shop; usá el flujo visible de Product Shop.
- Para la verificación de cart summary, podés agregar `data-testid="cart-summary"` como parte del ejercicio si lo necesitás.
