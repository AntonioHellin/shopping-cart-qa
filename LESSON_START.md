# Lesson 14 start — Modelo A v2

This commit is the state **before** running the recorded prompt for lesson 14.

Construction rule: start from the original lesson result context, remove the prompt result, and preserve required preconditions/fixtures.
Source base snapshot: 575727d
Topic: sentry implementation

## Lesson notes
- La validación de DSN/dashboard Sentry es externa/manual.
- Si la prompt dice `src/components/TestErrorButton.tsx`, en esta estructura preferí `src/infrastructure/TestErrorButton.tsx` o `src/shared/components/TestErrorButton.tsx`.
