# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) for the AI Course shopping cart project.

## What is an ADR?

An ADR documents important architectural decisions made during the project. Each record captures:
- **Context**: What problem or situation required a decision
- **Options**: What alternatives were considered
- **Decision**: What option was chosen
- **Rationale**: Why this option over others
- **Consequences**: Benefits and tradeoffs of the decision

ADRs are **immutable** - they are never deleted, only superseded. This preserves the history of decision-making and helps teams learn from past choices.

## Active ADRs

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [ADR-001](./001-state-management-library.md) | Use React Context API for State Management | Accepted | 2025-10-21 |
| [ADR-002](./002-testing-strategy-vitest.md) | Use Vitest for Unit and Integration Testing | Accepted | 2025-10-21 |
| [ADR-003](./003-e2e-testing-playwright.md) | Use Playwright for E2E Testing | Accepted | 2025-10-21 |
| [ADR-004](./004-observability-sentry.md) | Use Sentry for Error Tracking and Observability | Accepted | 2025-10-21 |

## Superseded ADRs

None yet.

## Creating a New ADR

1. Copy the template:
   ```bash
   cp docs/adr/template.md docs/adr/005-your-decision.md
   ```

2. Fill in the sections:
   - Context: Explain the problem
   - Options: List alternatives considered
   - Decision: State what was chosen
   - Rationale: Explain why
   - Consequences: List pros and cons

3. Create a PR for review:
   ```bash
   git checkout -b adr/005-your-decision
   git add docs/adr/005-your-decision.md
   git commit -m "docs: propose ADR-005 for [decision]"
   git push
   ```

4. After team approval, update status to "Accepted" and merge

## ADR Principles

**When to create an ADR**:
- Framework choices (React, Vue, etc.)
- Library selections (state management, testing, etc.)
- Architecture patterns (monolith, microservices, etc.)
- Security approaches (auth strategy, etc.)
- Decisions that are hard to reverse
- Decisions affecting multiple developers

**When NOT to create an ADR**:
- Naming variables or functions
- Adding utility functions
- Bug fixes
- Minor dependency updates
- Internal refactoring

**Rule of thumb**: If the decision affects multiple developers or is hard to reverse, write an ADR.

## References

- [ADR GitHub organization](https://adr.github.io/)
- [Documenting Architecture Decisions (Michael Nygard)](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [Why Write ADRs](https://github.blog/2020-08-13-why-write-adrs/)
