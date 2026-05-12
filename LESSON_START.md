# Lesson 19 start — Modelo A v2

This commit is the state **before** running the recorded prompt for lesson 19.

Construction rule: start from the original lesson result context, remove the prompt result, and preserve required preconditions/fixtures.
Source base snapshot: 70bf6a2
Topic: web security

## Lesson notes
- React escapa `{product.name}` por defecto. DOMPurify es necesario cuando renderizás HTML/rich text con `dangerouslySetInnerHTML`.
- `src/api/mockServer.ts` se agrega como fixture vulnerable para practicar security headers.
