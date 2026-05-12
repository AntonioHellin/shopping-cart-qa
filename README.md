# 🛒 AI Course - Product Shop

> Educational project demonstrating Testing, Quality, Security, and AI-Assisted Development practices

A modern e-commerce shopping cart built with React 19, TypeScript, and Vite, showcasing professional development practices through 29 progressive lessons.

## 📚 What is This Project?

This is an **educational repository** where each Git commit represents one complete lesson on software quality practices. The project evolves from a simple shop to a production-ready application with:

- ✅ 142 unit/integration tests (TDD approach)
- ✅ 21 E2E tests across 3 browsers
- ✅ 100/80/0 strategic test coverage
- ✅ Security best practices (OWASP Top 10)
- ✅ Observability with Sentry
- ✅ Quality gates (Husky hooks)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/ai-course.git
cd ai-course

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

---

## 🧪 Testing

This project follows **Test-Driven Development (TDD)** and maintains high test coverage.

### Run All Tests

```bash
# Unit + Integration tests (Vitest)
pnpm test

# Watch mode for TDD
pnpm test:watch

# With coverage report
pnpm test:coverage

# E2E tests (Playwright - all browsers)
pnpm test:e2e

# E2E tests (Chromium only - faster for CI)
pnpm test:e2e --project=chromium
```

### Expected Test Output

```
✅ calculateSubtotal › should sum item prices correctly (2ms)
✅ formatPrice › should format price as USD (1ms)
✅ ProductCard › should render product information (45ms)
✅ E2E › Shopping Journey › should complete checkout (1.2s)

Test Files  13 passed (13)
Tests  142 passed (142)
```

### Test Coverage (100/80/0 Strategic Rule)

```
CORE Tier (100% required):
  ✅ calculateSubtotal.ts    100% coverage
  ✅ formatPrice.ts          100% coverage
  ✅ validatePassword.ts     100% coverage

IMPORTANT Tier (80%+ required):
  ✅ ProductCard.tsx         100% coverage
  ✅ ShoppingCart.tsx        100% coverage
  ✅ SecurityChecklist.tsx   98.46% coverage

INFRASTRUCTURE Tier (0% strategic):
  - main.tsx, env.ts, sentry.ts (not required)
```

---

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm run dev          # Start dev server (localhost:5173)
pnpm run build        # Build for production
pnpm run preview      # Preview production build

# Code Quality
pnpm run lint         # Run ESLint
pnpm run lint:fix     # Fix ESLint issues

# Testing
pnpm test             # Run unit tests
pnpm test:coverage    # Run tests with coverage
pnpm test:e2e         # Run E2E tests

# Metrics & Health
pnpm run metrics      # Run health check dashboard
```

### Code Quality Gates

This project uses Husky hooks to ensure code quality:

**Pre-commit:**
1. ✅ ESLint (code style)
2. ✅ Unit tests
3. ✅ TypeScript build

**Pre-push:**
1. ✅ Test coverage check
2. ✅ E2E tests (Chromium)

---

## 🏗️ Architecture

### Project Structure

```
src/
  features/
    product-catalog/      # Product display functionality
    shopping-cart/        # Cart management
    auth/                 # Authentication demo
    security/             # Security checklist
  shared/
    utils/                # Utility functions (2+ feature usage)
    strategies/           # Discount strategies (Strategy pattern)
    constants/            # Business rules
  infrastructure/
    sentry.ts             # Observability setup
    auth.ts               # Authentication logic
    env.ts                # Environment validation
```

### Key Patterns

- **Scope Rule**: Code used by 1 feature stays local; 2+ features goes to shared
- **Strategy Pattern**: Discount calculation with pluggable strategies
- **Container/Presentational**: Separation of logic and UI components
- **Test-Driven Development**: Tests written before implementation

---

## 🔒 Security

This project implements **OWASP Top 10 2021** security best practices:

- **A01**: Access Control - Role-based authorization
- **A03**: Injection - XSS prevention with DOMPurify
- **A05**: Security Misconfiguration - Environment validation with Zod
- **A07**: Auth Failures - Strong password validation
- **A09**: Logging & Monitoring - Sentry error tracking

See `SecurityChecklist` component in the app for full details.

---

## 📊 Observability

Integrated with [Sentry](https://sentry.io) for production monitoring:

- ✅ Error tracking with breadcrumbs
- ✅ Performance monitoring (Core Web Vitals)
- ✅ Session replay
- ✅ User feedback dialog

To enable Sentry:
1. Create a free account at [sentry.io](https://sentry.io)
2. Copy your DSN
3. Create `.env` file: `VITE_SENTRY_DSN=your-dsn-here`

---

## 📖 Documentation

### Inline Documentation (JSDoc)

All utility functions include comprehensive JSDoc comments:

```typescript
/**
 * Calculates the subtotal of all items in the shopping cart
 *
 * @param items - Array of cart items with price and quantity
 * @returns Subtotal in dollars (e.g., 99.99 for $99.99)
 *
 * @example
 * calculateSubtotal([
 *   { id: '1', name: 'Laptop', price: 999.99, quantity: 1 }
 * ]) // Returns: 999.99
 */
export function calculateSubtotal(items: CartItem[]): number
```

Hover over functions in VSCode to see full documentation.

### Additional Documentation

- `FOLLOWUP.md` - Lesson-by-lesson progress tracker
- `CLAUDE.md` - AI assistant instructions
- Each lesson commit message documents what was implemented

---

## 🧩 Tech Stack

### Core
- **React 19** - UI library with modern features
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling

### Testing
- **Vitest** - Unit/integration testing
- **Testing Library** - Component testing
- **Playwright** - E2E testing across browsers

### Quality & Security
- **ESLint + SonarJS** - Code quality linting
- **Husky** - Git hooks for quality gates
- **Zod** - Runtime validation
- **DOMPurify** - XSS prevention

### Observability
- **Sentry** - Error tracking, performance monitoring

---

## 📝 Course Lessons

This project is built through **29 progressive lessons**:

### Testing (Lessons 1-4)
- L1: Testing Setup
- L2: TDD Implementation
- L3: Integration Testing
- L4: E2E Testing

### Refactoring (Lessons 5-7)
- L5: Code Smells
- L6: Safe Refactoring
- L7: Advanced Patterns

### Metrics & Debt (Lessons 8-10)
- L8: Technical Debt
- L9: Essential Metrics
- L10: Strategic Coverage

### Quality Gates (Lessons 11-12)
- L11: Playwright Visibility
- L12: Husky Quality Gates

### Observability (Lessons 13-17)
- L13-17: Sentry Implementation

### Security (Lessons 18-21)
- L18: Environment & Secrets
- L19: Authentication
- L20: Web Security (XSS)
- L21: OWASP Top 10

### Documentation (Lessons 22-24)
- L22: Docs as Code ← **You are here**
- L23: APIs & Components
- L24: ADR

See `FOLLOWUP.md` for complete lesson details.

---

## 🤝 Contributing

This is an educational project. Each lesson is implemented as a single commit following the course curriculum.

---

## 📄 License

MIT License - Feel free to use this for learning purposes.

---

## 🙏 Acknowledgments

Built with ❤️ for AI Course
- React 19 + TypeScript + Vite
- Test-Driven Development
- OWASP Security Best Practices
- Production-Ready Patterns
