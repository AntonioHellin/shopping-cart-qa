# Shopping Cart Application

A modern Shopping Cart application built with React, TypeScript, and Vite.

## Quick Start

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

## Testing

### Ejecutar Tests

```bash
# Unit + Integration tests
pnpm test

# Con coverage report
pnpm test:coverage

# End-to-end tests
pnpm test:e2e
```

### Output Esperado

```text
✅ calculateSubtotal › should sum prices (2ms)
✅ ShoppingCart › should add items (15ms)
✅ E2E › complete checkout flow (1.2s)

Test Files  13 passed (13)
Tests       142 passed (142)
E2E Tests   7 passed (7)
Coverage    85%+
```

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).