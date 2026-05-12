# Lesson 09 start — Modelo A v2

This commit is the state **before** running the recorded prompt for lesson 09.

Construction rule: start from the original lesson result context, remove the prompt result, and preserve required preconditions/fixtures.
Source base snapshot: fdd345f
Topic: essential metrics

## Lesson notes
- El checkout real todavía es un botón pasivo en `CartSummary`.
- Para la métrica `checkoutCount`, usá el click del botón `Proceed to Checkout` como evento de “checkout completion” o conectá un `onCheckout` mínimo antes de instrumentar `localStorage`.
