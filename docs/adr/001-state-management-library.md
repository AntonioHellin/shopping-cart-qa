# ADR-001: State Management Library Selection

**Date**: 2026-09-15
**Status**: Superseded by ADR-002
**Superseded on**: 2026-11-20

## Context

The Shopping Cart application requires centralized, reactive state management across multiple distributed components (CartSummary, CartItem, ProductCard, and Navigation badge). As the application grows, managing cart items, authentication status, and discount calculations requires a scalable solution.

### Constraints & Requirements
1. **Bundle Size Budget**: The application enforces a strict performance budget with total bundle target under 500KB. Adding heavy libraries negatively impacts Web Vitals (LCP/TBT).
2. **Developer Experience**: The team needs minimal boilerplate to rapidly ship features without managing complex actions, reducers, dispatchers, and provider trees.
3. **Render Performance**: Cart state modifications must not trigger cascading re-renders across unrelated components.
4. **Testing Ergonomics**: Stores must be straightforward to mock and reset in unit and integration tests without wrapping every test in nested context providers.
5. **Type Safety**: Seamless TypeScript inference without extensive manual typing.

## Options Considered

### 1. Redux Toolkit (RTK)
- **Pros**: Mature ecosystem, comprehensive Redux DevTools, standardized conventions for large teams.
- **Cons**: Large bundle footprint (~11-15 KB gzipped), boilerplate-heavy (slices, dispatchers, action creators), steep learning curve.

### 2. Zustand
- **Pros**: Extremely lightweight (~3 KB gzipped), zero boilerplate hook-based API, native selective subscriptions preventing unnecessary re-renders, first-class TypeScript inference, trivial testing without providers.
- **Cons**: Less opinionated architecture requiring team conventions, smaller ecosystem compared to Redux.

### 3. React Context API + useReducer
- **Pros**: Native to React (0 KB additional bundle overhead), no third-party dependency.
- **Cons**: Lacks built-in selective subscriptions (any context update re-renders all consumers), provider wrapping pyramid, poor debugging capabilities.

## Decision

We will use **Zustand** for global state management in the Shopping Cart application.

## Rationale

- **Bundle Size (3KB vs 15KB Redux)**: Zustand is ~3KB gzipped with zero dependencies, fitting comfortably within our performance budget.
- **Developer Experience (Minimal Boilerplate)**: Stores are concise hooks callable anywhere in the component tree without provider wrappers.
- **Performance (Selective Re-renders)**: Granular selector subscriptions (useCartStore(state => state.items)) eliminate redundant renders and improve responsiveness.
- **TypeScript Support (First-class)**: Automatic type inference provides robust type safety with minimal code overhead.

## Consequences

### Positive
+ **Reduced Bundle Footprint**: Saved ~12KB compared to Redux Toolkit, improving initial page load.
+ **Faster Feature Delivery**: Team can create and consume state in minutes with zero boilerplate.
+ **Snappy UI Performance**: High rendering efficiency during rapid cart operations.
+ **Simplified Testing**: Unit tests interact directly with stores without complex test provider setup.

### Negative
- **Architectural Conventions**: Since Zustand is unopinionated, the team must maintain self-discipline regarding store organization.
- **DevTools Setup**: Redux DevTools integration requires explicitly adding the devtools middleware.

## References
- [Zustand Documentation](https://zustand.docs.pmnd.rs/)
- [Bundlephobia: Zustand](https://bundlephobia.com/package/zustand)
- [React State Management Benchmark](https://github.com/pmndrs/zustand)

## Superseded By

[ADR-002: Migrate to Redux Toolkit](./002-migrate-to-redux-toolkit.md)

Original decision worked for 2 months but app outgrew Zustand's simplicity.
