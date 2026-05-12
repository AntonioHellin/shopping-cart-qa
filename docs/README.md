# Documentation

This directory contains comprehensive documentation for the AI Course shopping cart project.

## Overview

This documentation demonstrates best practices for technical communication, including:
- Architecture Decision Records (ADRs)
- API Documentation (OpenAPI/Swagger)
- Component Documentation (Storybook)
- Executive Summaries for non-technical stakeholders
- Testing documentation and code coverage reports

## Directory Structure

```
docs/
├── adr/                    # Architecture Decision Records
│   ├── README.md          # ADR index and guidelines
│   ├── template.md        # Reusable ADR template
│   ├── 001-state-management-library.md
│   ├── 002-testing-strategy-vitest.md
│   ├── 003-e2e-testing-playwright.md
│   └── 004-observability-sentry.md
│
├── api/                    # API Documentation
│   └── openapi.yaml       # OpenAPI 3.0 specification
│
├── templates/              # Executive Summary Templates
│   ├── README.md          # Template usage guide
│   ├── executive-summary-template.md
│   ├── sprint-summary-template.md
│   └── security-audit-template.md
│
├── examples/               # Real-world Examples
│   ├── README.md          # Examples overview
│   ├── cart-performance-summary.md
│   └── security-audit-summary.md
│
└── README.md              # This file
```

## Documentation Types

### 1. Architecture Decision Records (ADRs)

**Purpose**: Document important architectural decisions

**Location**: [`adr/`](./adr/)

**What's included**:
- Decision records for state management, testing, E2E, observability
- Template for creating new ADRs
- Index of all decisions with status tracking

**When to use**:
- Framework choices (React, Vue, etc.)
- Library selections (state management, testing, etc.)
- Architecture patterns
- Security approaches
- Decisions that are hard to reverse

**Learn more**: [ADR README](./adr/README.md)

---

### 2. API Documentation

**Purpose**: Document API endpoints with OpenAPI/Swagger

**Location**: [`api/openapi.yaml`](./api/openapi.yaml)

**What's included**:
- 8 simulated endpoints (Products, Cart, Auth)
- Request/response schemas
- Authentication requirements
- Example requests and responses

**View the docs**:
```bash
# Option 1: Swagger UI (online)
# Paste openapi.yaml content at https://editor.swagger.io/

# Option 2: Swagger UI (local)
pnpm add -D swagger-ui-express
# Then serve with Express server
```

**Note**: These are **simulated endpoints** for educational purposes. The actual app uses local state (no real API).

---

### 3. Component Documentation (Storybook)

**Purpose**: Interactive component documentation

**Location**: `.storybook/` and `src/**/*.stories.tsx`

**What's included**:
- ProductCard component stories
- CartItem component stories
- ShoppingCart component stories
- Accessibility testing (a11y addon)
- Visual testing integration (Vitest)

**View the docs**:
```bash
pnpm storybook
# Opens http://localhost:6006
```

**Benefits**:
- Visual component library
- Interactive prop testing
- Accessibility validation
- Isolated component development

---

### 4. Executive Summary Templates

**Purpose**: Translate technical work to business language

**Location**: [`templates/`](./templates/) and [`examples/`](./examples/)

**What's included**:

**Templates**:
- [Executive Summary Template](./templates/executive-summary-template.md) - General-purpose
- [Sprint Summary Template](./templates/sprint-summary-template.md) - Sprint updates
- [Security Audit Template](./templates/security-audit-template.md) - Security work

**Examples**:
- [Cart Performance Summary](./examples/cart-performance-summary.md) - Shows technical vs executive versions
- [Security Audit Summary](./examples/security-audit-summary.md) - Security vulnerability translation

**Use cases**:
- Communicating with CEO, Board, Product VPs
- Sprint reviews for stakeholders
- Security audit results
- Performance optimization results

**Learn more**: [Templates README](./templates/README.md) | [Examples README](./examples/README.md)

---

## Quick Start

### For Developers

**1. Read ADRs to understand decisions**:
```bash
# Start here to understand why we chose these technologies
cat docs/adr/README.md
cat docs/adr/001-state-management-library.md
cat docs/adr/002-testing-strategy-vitest.md
```

**2. View component documentation**:
```bash
pnpm storybook
# Interactive component library with examples
```

**3. Explore API documentation**:
```bash
# Paste docs/api/openapi.yaml at https://editor.swagger.io/
# See all endpoints, schemas, and examples
```

### For Stakeholders

**1. Read executive summaries to understand impact**:
```bash
# Business-focused summaries, no technical jargon
cat docs/examples/cart-performance-summary.md
cat docs/examples/security-audit-summary.md
```

**2. Review ADR decisions** (optional):
```bash
# High-level decisions with business rationale
cat docs/adr/README.md
```

### For Creating Your Own Summaries

**1. Choose a template**:
```bash
# General project
cat docs/templates/executive-summary-template.md

# Sprint update
cat docs/templates/sprint-summary-template.md

# Security work
cat docs/templates/security-audit-template.md
```

**2. Follow the AI prompt workflow**:
- Fill in the template with your project details
- Use ChatGPT/Claude to generate initial draft
- Review and refine with AI feedback
- Human review and finalize

**3. Study the examples**:
```bash
# See how technical work translates to business language
cat docs/examples/cart-performance-summary.md
cat docs/examples/security-audit-summary.md
```

---

## Documentation Best Practices

### 1. ADRs (Architecture Decision Records)

**✅ DO**:
- Document decisions that affect multiple developers
- Include context, options, decision, rationale, consequences
- Mark superseded ADRs (never delete them)
- Create ADR BEFORE implementing the decision

**❌ DON'T**:
- Document minor implementation details
- Delete or modify existing ADRs (mark as superseded instead)
- Skip the "rationale" section
- Write ADRs after the fact (create them during decision-making)

**Learn more**: [ADR Principles](./adr/README.md#adr-principles)

---

### 2. API Documentation (OpenAPI)

**✅ DO**:
- Document all public endpoints
- Include request/response examples
- Specify authentication requirements
- Keep schema definitions DRY (use $ref)

**❌ DON'T**:
- Document internal/private endpoints
- Skip error responses
- Use vague descriptions
- Forget to version your API

---

### 3. Component Documentation (Storybook)

**✅ DO**:
- Create stories for reusable components
- Show different states (default, loading, error)
- Include accessibility tests
- Document props with TypeScript types

**❌ DON'T**:
- Document every trivial component
- Skip edge cases (empty states, errors)
- Forget to test accessibility
- Use stories as a substitute for unit tests

---

### 4. Executive Summaries

**✅ DO**:
- Start with business impact (revenue, risk, users)
- Use specific metrics (10x faster, +$120K/month)
- Explain "why" (15% of users complained)
- Keep short (200-300 words)
- Include "what's next"
- Human review AI-generated content

**❌ DON'T**:
- Use technical jargon without explanation
- Skip metrics ("made it faster" → "10x faster")
- Forget the "why" ("migrated to Zustand" → "fixed slow cart")
- Write too long (> 500 words)
- Publish AI output without review

**Learn more**: [Executive Summary Best Practices](./templates/executive-summary-template.md#best-practices)

---

## Integration with Development Workflow

### ADRs in Pull Requests

When making architectural decisions:

1. Create ADR first (use `docs/adr/template.md`)
2. Open PR for ADR review
3. Discuss and refine with team
4. Merge ADR
5. Implement the decision
6. Reference ADR in implementation PR

**Example PR description**:
```markdown
Implements cart performance optimization from ADR-005

Closes #123

This PR implements the decision documented in ADR-005 to migrate
from Context API to Zustand for improved performance.

See: docs/adr/005-cart-state-zustand.md
```

### API Documentation in CI

**Validate OpenAPI spec**:
```bash
# Add to CI pipeline
pnpm add -D @apidevtools/swagger-cli
pnpm swagger-cli validate docs/api/openapi.yaml
```

### Storybook in CI

**Build and publish Storybook**:
```bash
# Build static Storybook
pnpm build-storybook

# Deploy to GitHub Pages, Netlify, Vercel, etc.
# Example: https://your-project.github.io/storybook
```

### Executive Summaries in Sprint Reviews

**End-of-sprint workflow**:

1. Use `docs/templates/sprint-summary-template.md`
2. Fill in sprint details (completed work, metrics)
3. Generate draft with AI
4. Review and refine
5. Share with stakeholders via email/Slack
6. Archive in `docs/sprint-summaries/` (optional)

---

## Tools and Resources

### ADRs
- [ADR GitHub organization](https://adr.github.io/)
- [Documenting Architecture Decisions (Michael Nygard)](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [Why Write ADRs](https://github.blog/2020-08-13-why-write-adrs/)

### API Documentation
- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger Editor](https://editor.swagger.io/) - Online OpenAPI editor
- [Swagger UI](https://swagger.io/tools/swagger-ui/) - Interactive API docs

### Storybook
- [Storybook Documentation](https://storybook.js.org/docs)
- [Storybook Addons](https://storybook.js.org/addons) - Accessibility, Visual Testing, etc.
- [Storybook Best Practices](https://storybook.js.org/docs/writing-stories/best-practices)

### Executive Summaries
- Templates: [`docs/templates/`](./templates/)
- Examples: [`docs/examples/`](./examples/)
- AI Tools: ChatGPT, Claude, GitHub Copilot, Notion AI

---

## Contributing to Documentation

### Adding a New ADR

```bash
# 1. Copy template
cp docs/adr/template.md docs/adr/005-your-decision.md

# 2. Fill in sections
# Edit: Context, Options, Decision, Rationale, Consequences

# 3. Update index
# Add entry to docs/adr/README.md "Active ADRs" table

# 4. Create PR
git checkout -b adr/005-your-decision
git add docs/adr/005-your-decision.md docs/adr/README.md
git commit -m "docs: propose ADR-005 for [decision]"
git push
```

### Updating API Documentation

```bash
# 1. Edit OpenAPI spec
# Edit: docs/api/openapi.yaml

# 2. Validate
pnpm swagger-cli validate docs/api/openapi.yaml

# 3. Test in Swagger Editor
# Paste content at https://editor.swagger.io/

# 4. Commit
git add docs/api/openapi.yaml
git commit -m "docs: add new cart endpoint to API spec"
```

### Adding Component Stories

```bash
# 1. Create story file
# Create: src/features/[feature]/components/YourComponent.stories.tsx

# 2. Write stories
# Show: Default, Loading, Error, Edge cases

# 3. Test in Storybook
pnpm storybook

# 4. Run Storybook tests
pnpm test:storybook

# 5. Commit
git add src/features/[feature]/components/YourComponent.stories.tsx
git commit -m "docs: add Storybook stories for YourComponent"
```

### Creating Executive Summaries

```bash
# 1. Choose template
cat docs/templates/executive-summary-template.md

# 2. Use AI to generate draft
# Fill template, paste to ChatGPT/Claude

# 3. Review and refine
# Verify facts, adjust tone, confirm metrics

# 4. Share with stakeholders
# Email, Slack, sprint review, etc.

# 5. Archive (optional)
# Save to docs/sprint-summaries/ or docs/examples/
```

---

## Maintenance

### Regular Reviews

**ADRs**:
- Quarterly: Review all ADRs for superseded decisions
- When superseding: Create new ADR, mark old one as "Superseded by ADR-XXX"

**API Docs**:
- Every API change: Update openapi.yaml
- Monthly: Validate spec with `swagger-cli validate`

**Storybook**:
- Every component change: Update stories
- Sprint review: Demo new stories to team

**Executive Summaries**:
- End of sprint: Create sprint summary
- End of quarter: Create quarterly summary
- Major projects: Create project summary

---

## Getting Help

**For documentation questions**:
- ADRs: See [ADR README](./adr/README.md)
- API: See [OpenAPI Specification](https://swagger.io/specification/)
- Storybook: See [Storybook Docs](https://storybook.js.org/docs)
- Executive Summaries: See [Templates README](./templates/README.md)

**For technical questions**:
- See main [README.md](../README.md)
- Check [FOLLOWUP.md](../FOLLOWUP.md) for project progress

**For course questions**:
- See slides in `slides/` directory
- Each lesson has comprehensive documentation
