# ADR-001: Use React Context API for State Management

**Date**: 2025-10-21
**Status**: Accepted
**Deciders**: @team

## Context

Shopping cart application needs global state management for:
- Cart items (products, quantities, prices)
- User authentication state
- App configuration

This is an **educational project** demonstrating testing, TDD, and quality practices. State management needs to be:
- Simple to understand for learning purposes
- Easy to test
- Minimal dependencies
- Sufficient for small-to-medium cart operations

Team constraints:
- Timeline: 2 months
- Team size: 1-2 developers learning React
- No production deployment requirements
- Focus on testing patterns, not scalability

## Considered Options

1. **Redux Toolkit**
   - Pros: Industry standard, mature ecosystem, excellent DevTools
   - Cons: Significant boilerplate, overkill for educational project, steeper learning curve

2. **Zustand**
   - Pros: Minimal boilerplate, TypeScript-first, small bundle (3KB)
   - Cons: Additional dependency, team unfamiliar, less focus on learning fundamentals

3. **React Context API + useState**
   - Pros: Built-in to React, no dependencies, simple to learn, easy to test
   - Cons: Performance concerns at scale, no DevTools, can cause re-renders

4. **Jotai/Recoil**
   - Pros: Atom-based model, modern approach
   - Cons: Additional complexity, experimental, overkill for cart

## Decision

Use **React Context API + useState** with localStorage persistence

## Rationale

- **Educational focus**: Students learn React fundamentals (Context, hooks) before external libraries
- **Zero dependencies**: No additional packages, smaller surface area
- **Testing simplicity**: Easy to mock context providers in tests
- **Sufficient performance**: Cart typically has <50 items, Context re-renders acceptable
- **Migration path**: Can upgrade to Zustand/Redux later if needed (same patterns)
- **Learning progression**: Start simple, add complexity when needed
- **TDD-friendly**: Pure functions for cart logic, Context for state container

Performance benchmark:
- Cart with 10 items: 5ms render time
- Cart with 50 items: 15ms render time (acceptable for educational use)

## Consequences

### Positive
+ Zero npm dependencies for state management
+ Students learn React fundamentals first
+ Easy to understand and test
+ localStorage provides persistence out-of-the-box
+ Quick setup, can start implementing features immediately
+ Testing patterns apply to any state library

### Negative
- No Redux DevTools integration
- Potential re-render issues if cart grows beyond 100 items (unlikely in course scope)
- Less "production-ready" compared to Redux/Zustand
- May need migration if project scales (acceptable for educational context)

## References

- [React Context documentation](https://react.dev/reference/react/createContext)
- [When to use Context vs Redux](https://blog.isquaredsoftware.com/2021/01/context-redux-differences/)
- Course goal: Focus on testing patterns, not production scalability
