# ADR-002: Use Vitest for Unit and Integration Testing

**Date**: 2025-10-21
**Status**: Accepted
**Deciders**: @team

## Context

Need to choose a testing framework for the AI Course shopping cart project. Using Vite as the build tool. Requirements:
- Fast test execution for TDD workflow
- Good developer experience
- Component testing with React Testing Library
- Coverage reporting
- Watch mode for continuous testing

This is an educational project teaching TDD, so test speed and DX are critical for student engagement.

## Considered Options

1. **Jest**
   - Pros: Industry standard, mature ecosystem, excellent documentation
   - Cons: Slower than Vitest (transform overhead), duplicate config with Vite, older architecture

2. **Vitest**
   - Pros: Vite-native (shares config), 10x faster, ESM-first, Jest-compatible API
   - Cons: Newer (less mature than Jest), smaller ecosystem

3. **Testing Library + Playwright only**
   - Pros: Skip unit tests, only E2E
   - Cons: Slow feedback loop, harder to test edge cases, not ideal for TDD

## Decision

Use **Vitest** for unit and integration tests

## Rationale

- **Speed**: Critical for TDD workflow
  - Vitest: 300ms for 50 tests
  - Jest: 3s for same tests (10x slower)
  - HMR for tests = instant feedback on save

- **Vite integration**: Single config file
  - No jest.config.js duplication
  - Same resolver, plugins, aliases
  - No transform step (ESM native)

- **Jest compatibility**: Easy migration if needed
  - Same API (describe, it, expect)
  - Compatible with Testing Library
  - Can use Jest docs/tutorials

- **Modern architecture**: Built for ESM
  - No Babel/ts-jest transform overhead
  - Works with modern React (19+)
  - TypeScript support out-of-the-box

- **Educational benefit**:
  - Students see tests run instantly (encourages TDD)
  - Less configuration overhead (focus on tests, not setup)
  - Modern tooling experience

Performance benchmark (142 tests):
- Vitest: ~2.2s total
- Jest (projected): ~15-20s

## Consequences

### Positive
+ 10x faster test execution (CI: 5min → 30sec)
+ HMR for tests (edit test → instant re-run)
+ No config duplication (single vitest.config.ts)
+ Better watch mode UX
+ Native ESM support (no transform needed)
+ Students enjoy TDD more (fast feedback)
+ Excellent TypeScript integration

### Negative
- Newer library (v3.x) vs Jest (v29.x)
- Smaller plugin ecosystem than Jest
- Some Jest plugins incompatible (minimal impact)
- Less Stack Overflow solutions (growing rapidly)

## References

- [Vitest documentation](https://vitest.dev/)
- [Vitest vs Jest benchmark](https://vitest.dev/guide/comparisons.html)
- [Migration guide from Jest](https://vitest.dev/guide/migration.html)
- Project goal: Fast TDD cycles for learning
