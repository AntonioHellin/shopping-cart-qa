# Lesson 17 start — Modelo A v2

This commit is the state **before** running the recorded prompt for lesson 17.

Construction rule: start from the original lesson result context, remove the prompt result, and preserve required preconditions/fixtures.
Source base snapshot: c7cb661
Topic: sentry alertas

## Lesson notes
- La configuración de Alert Rules en Sentry/Slack/email es externa y no versionable.
- Para el playbook versionable, usá `src/features/shopping-cart/ShoppingCart.tsx` o el owner real del carrito en vez de un `CartContext` inexistente.
