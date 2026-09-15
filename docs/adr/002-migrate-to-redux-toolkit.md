# ADR-002: Migrate to Redux Toolkit

**Date**: 2026-11-20
**Status**: Accepted
**Supersedes**: [ADR-001: State Management Library Selection](./001-state-management-library.md)

## Context

Since the adoption of Zustand in ADR-001, the application architecture and product scope have expanded significantly over the past 2 months:
- **State Slices Growth**: Scaled from 3 basic slices to 15+ complex state domains (Cart, User/Auth, Product Catalog, Checkout & Payments, Orders History, Inventory, Promotional Discounts, Wishlist, User Preferences, Notifications, Real-time Analytics, and Error Tracking).
- **Async Workflow Complexity**: Shifted from simple state updates to complex orchestrated asynchronous flows, including optimistic UI updates with automatic rollbacks, API polling, automatic retry with backoff, token refresh queues, and offline caching.
- **Debugging & Telemetry Needs**: As team size and production traffic scaled, troubleshooting race conditions and complex multi-slice interactions requires industrial-grade time-travel debugging, action replaying, and deep integration with Sentry telemetry breadcrumbs.
- **Team Scaling & Architecture**: With multiple distributed developers contributing simultaneously, Zustand's lack of strict architectural boundaries led to inconsistent state mutation patterns and fragmentation in store organization.

## Decision

Migrate from Zustand to **Redux Toolkit (RTK)** and **RTK Query** as the primary state management and data fetching standard for the application.

## Rationale

1. **Standardized Architecture at Scale**: Redux Toolkit provides rigid, opinionated slice structures and action conventions that prevent architecture fragmentation across 15+ domain slices.
2. **Advanced Async & Caching with RTK Query**: Eliminates hundreds of lines of custom async fetching, deduplication, and cache invalidation logic currently maintained by hand.
3. **Enterprise-Grade Debugging & Observability**: Redux DevTools provides deterministic action history, time-travel debugging, state snapshots, and seamless export of action logs for reproducing edge-case bugs captured in Sentry.
4. **Predictable State Mutations**: Built-in Immer integration guarantees immutable updates with intuitive mutable syntax and typed action dispatchers.
5. **Team Alignment & Ecosystem**: Standardizes developer workflows across the entire engineering organization, significantly speeding up PR reviews and onboarding of new developers.

## Migration Plan

The migration will follow a 4-phase incremental coexistence strategy over 4 weeks to avoid disrupting feature delivery:

| Phase | Milestone | Scope | Estimated Duration |
|---|---|---|---|
| **Phase 1** | **Foundation & Coexistence** | Install redux toolkit and react-redux. Configure root store, typed hooks, and Redux Provider at application root alongside existing Zustand stores. | Week 1 |
| **Phase 2** | **Domain Slice Migration** | Incrementally migrate non-critical slices first (User Preferences, Notifications), followed by core domains (Auth/User -> Products Catalog -> Cart & Checkout). | Weeks 2-3 |
| **Phase 3** | **Data Layer Modernization** | Migrate API endpoints to RTK Query API definitions with automatic cache management and optimistic updates. | Week 3 |
| **Phase 4** | **Cleanup & Optimization** | Remove obsolete Zustand stores and dependencies. Run bundle analysis and performance audits. | Week 4 |

## Consequences

### Positive
+ **Unified Architecture**: Enforces uniform conventions across 15+ slices and multi-developer teams.
+ **Deterministic Debugging**: Instant replay of user actions and state transitions during bug investigation.
+ **Automated Cache Invalidation**: RTK Query manages server state lifecycle, tags, and refetching automatically.
+ **High Reliability**: Type-safe actions, centralized middleware, and standardized error handling.

### Negative / Tradeoffs
- **Migration Effort**: Requires an estimated 4-week phased transition and team alignment.
- **Bundle Footprint**: Increases production bundle size by ~12KB gzipped (well within our revised performance budget after code-splitting and dynamic imports).
- **Boilerplate**: Slightly higher ceremony compared to lightweight Zustand hooks, though significantly reduced compared to legacy Redux.

## References
- [ADR-001: State Management Library Selection](./001-state-management-library.md)
- [Redux Toolkit Official Documentation](https://redux-toolkit.js.org/)
- [RTK Query Overview & Tutorial](https://redux-toolkit.js.org/rtk-query/overview)
- [Migrating from Zustand to Redux Toolkit Guide](https://redux.js.org/usage/migrating-to-modern-redux)
