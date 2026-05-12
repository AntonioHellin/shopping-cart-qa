# Executive Summary Templates

This directory contains templates for creating executive summaries with AI assistance.

## Overview

**Purpose**: Help developers translate technical work into business language that executives understand.

**The Problem**: Technical reports don't communicate business value to non-technical stakeholders (CEO, Board, Product VPs).

**The Solution**: Use AI tools (ChatGPT, Claude) to generate executive summaries that focus on business impact, not technical details.

## Available Templates

### 1. [Executive Summary Template](./executive-summary-template.md)
General-purpose template for any project or feature.

**Use for**:
- Feature launches
- Project completions
- Technical improvements
- Architecture changes

**Includes**:
- AI prompt template
- Structure guidelines
- Audience-specific versions (CEO, Product VP, Engineering Director)
- Metrics translation guide
- Common mistakes to avoid

### 2. [Sprint Summary Template](./sprint-summary-template.md)
Quick template for end-of-sprint stakeholder updates.

**Use for**:
- Sprint reviews
- Weekly/biweekly updates
- Stakeholder check-ins

**Includes**:
- Short format (150-200 words)
- User benefits translation
- Sprint health metrics
- Next sprint preview

### 3. [Security Audit Template](./security-audit-template.md)
Specialized template for security work.

**Use for**:
- Security audits
- Vulnerability remediation
- Compliance reporting
- Incident post-mortems

**Includes**:
- Risk translation guide (CVSS → business impact)
- Compliance status reporting
- Customer protection messaging
- Severity level translation

## Examples

See the [examples/](../examples/) directory for real-world examples:

- **[Cart Performance Summary](../examples/cart-performance-summary.md)**: Shows technical vs executive versions
- **[Security Audit Summary](../examples/security-audit-summary.md)**: Security vulnerability translation

## Quick Start Guide

### Step 1: Choose Your Template

Pick the template that matches your scenario:
- General project → `executive-summary-template.md`
- Sprint update → `sprint-summary-template.md`
- Security work → `security-audit-template.md`

### Step 2: Gather Your Information

Collect these details:

**Project Info**:
- What problem did we solve?
- How long did it take?
- Who worked on it?

**Technical Details**:
- What did we build/fix/optimize?
- What changed technically?

**Business Context**:
- Why did this matter?
- Who are the users?
- What was the pain point?

**Metrics**:
- Before: What were the baseline numbers?
- After: What improved?
- Impact: Revenue, users, satisfaction

### Step 3: Use AI to Generate Draft

Copy the AI prompt template and fill in your details:

```
I need an executive summary for [PROJECT NAME]

Project details:
- Goal: Fixed slow checkout performance
- Duration: 2 weeks
- Team size: 3 developers

Technical work completed:
- Migrated state management from Context to Zustand
- Optimized rendering performance
- Reduced re-renders by 80%

Business context:
- Company: E-commerce shopping cart
- Users: Mobile shoppers
- Problem: 15% of users complained about slow checkout
- Goal: Improve conversion rate

Metrics:
- Before: 5.1s checkout time, 8.2% conversion
- After: 3.4s checkout time, projected 12.7% conversion

Target audience: CEO

Please create an executive summary that:
1. Explains business impact (not technical details)
2. Includes revenue projection
3. Highlights user experience improvements
4. Suggests next steps
5. Keep under 300 words
6. Avoid jargon
```

### Step 4: Review and Refine

**AI gives you a draft** → **You review and improve**

Give AI feedback:
```
Good start, but:
1. Be more specific about metrics (10x faster, 450ms removed)
2. Add revenue projection ($120K/month)
3. Include what's next (payment optimization)
4. Mention the user pain point (slow checkout complaints)

Regenerate with these details.
```

### Step 5: Human Review (Critical!)

**NEVER publish AI output without review**

Verify:
- [ ] Facts are accurate
- [ ] Metrics are correct
- [ ] Tone is appropriate for audience
- [ ] No unexplained jargon
- [ ] Business impact is clear
- [ ] "Why" is explained
- [ ] Under word count target

## Translation Guides

### Technical → Business Metrics

| Technical Metric | Business Translation |
|-----------------|---------------------|
| "Test coverage: 85%" | "85% automated testing prevents bugs" |
| "Bundle size: 230KB" | "Page load 40% faster" |
| "Render time: 50ms" | "Cart updates 10x faster" |
| "Lines of code: -1,500" | "30% easier to maintain" |
| "CVSS 9.1 vulnerability" | "Could expose all customer data" |

### Jargon → Plain Language

| Technical Jargon | Plain Language |
|-----------------|----------------|
| "SQL injection vulnerability" | "Could steal customer data" |
| "React.memo optimization" | "Smoother, faster UI" |
| "CSRF tokens" | "Prevents unauthorized account access" |
| "Migrated to Zustand" | "Improved cart performance" |
| "bcrypt with salt rounds = 12" | "Bank-level password encryption" |

## Best Practices

### ✅ DO

1. **Start with business impact**
   - "Faster checkout increases conversions by 4.5%"
   - NOT "We refactored the state management layer"

2. **Use specific numbers**
   - "10x faster, +$120K/month, 95% fewer tickets"
   - NOT "Much faster, more revenue, fewer complaints"

3. **Explain "why"**
   - "Fixed slow checkout reported by 15% of mobile users"
   - NOT "Improved cart performance"

4. **Keep it short**
   - CEO: 200 words
   - Product VP: 300 words
   - Engineering Director: 400-500 words

5. **Include "what's next"**
   - "Next: Payment optimization by March 15"
   - Shows ongoing improvement

6. **Human review always**
   - AI generates draft
   - Human verifies facts, adjusts tone, confirms metrics

### ❌ DON'T

1. **Use technical jargon**
   - ❌ "Implemented binary search tree with O(log n) lookup"
   - ✅ "Cart operations 10x faster"

2. **Skip metrics**
   - ❌ "Made the cart faster"
   - ✅ "10x faster (500ms → 50ms)"

3. **Forget the "why"**
   - ❌ "Migrated from Context API to Zustand"
   - ✅ "Fixed slow cart causing users to abandon checkout"

4. **Write too long**
   - Maximum 500 words
   - If longer → split into summary + appendix

5. **Publish AI output without review**
   - Always verify facts
   - Always check tone
   - Always confirm metrics

## Audience-Specific Guidelines

### CEO Summary
- **Focus**: Revenue, risk, competitive advantage
- **Metrics**: $$$, customer satisfaction, market share
- **Length**: 200 words
- **Example**: "Cart improvements project to increase Q2 revenue by $480K"

### Product VP Summary
- **Focus**: User experience, metrics, roadmap
- **Metrics**: User satisfaction, engagement, feature usage
- **Length**: 300 words
- **Example**: "Mobile checkout satisfaction improved from 3.2 to 4.1 stars"

### Engineering Director Summary
- **Focus**: Technical decisions, team, velocity
- **Metrics**: Test coverage, code quality, sprint velocity
- **Length**: 400-500 words
- **Example**: "Team delivered on time with 85% coverage, ADR documented"

## AI Tools

**ChatGPT**:
- Best for: General summaries, multiple iterations
- Prompt: "Translate this technical report to executive summary"

**Claude**:
- Best for: Longer documents, nuanced writing
- Prompt: "Summarize for non-technical stakeholders"

**GitHub Copilot**:
- Best for: Quick summaries in PR descriptions
- Comment: `// Executive summary:` → Copilot suggests

**Notion AI**:
- Best for: Summaries from meeting notes
- Select text → "Summarize for executives"

## Common Scenarios

### Feature Launch
Use: `executive-summary-template.md`
Focus: User benefits, adoption metrics, revenue impact
Length: 300 words

### Sprint Update
Use: `sprint-summary-template.md`
Focus: Sprint goals, delivered features, next sprint
Length: 200 words

### Security Work
Use: `security-audit-template.md`
Focus: Risk reduction, compliance, customer protection
Length: 300 words

### Performance Optimization
Use: `executive-summary-template.md`
Focus: Speed improvements, conversion impact, user satisfaction
Length: 300 words

### Bug Fixes
Use: `sprint-summary-template.md`
Focus: User impact, support ticket reduction, reliability
Length: 150 words

## Quality Checklist

Before sending to executives:

- [ ] Business impact is clear (revenue, risk, users)
- [ ] Specific metrics included (not vague "faster")
- [ ] "Why" explained (what problem was solved)
- [ ] No unexplained jargon (or jargon is defined)
- [ ] Under word count target
- [ ] "What's next" section included
- [ ] Human reviewed all facts and metrics
- [ ] Tested on non-technical person (they understand it)

## Resources

- [Examples directory](../examples/) - Real-world executive summaries
- [ADR documentation](../adr/) - See how we document decisions
- Slides: `slides/25-executive-summary.md` - Full lesson content

## Tips for Success

### 1. Know Your Audience

Different audiences care about different things:

- **CEO**: Revenue, risk, competition
- **Product VP**: Users, satisfaction, roadmap
- **Engineering Director**: Team, quality, velocity

Tailor your summary to what they care about.

### 2. Metrics Tell the Story

Numbers are more convincing than words:

- ✅ "10x faster" > "much faster"
- ✅ "+$120K/month" > "more revenue"
- ✅ "95% fewer tickets" > "fewer complaints"

### 3. Start with "Why"

Explain the problem before the solution:

- "15% of users complained about slow checkout" → THEN → "We optimized cart performance"

### 4. Iterate with AI

First draft is rarely perfect:
1. AI generates initial summary
2. You give specific feedback
3. AI regenerates with improvements
4. You finalize with human judgment

### 5. Keep It Short

Executives are busy:
- 2-3 minute read maximum
- Use bullet points
- Make it scannable
- Front-load the impact

## License

These templates are part of the AI Course educational project.
Use freely for your own executive summaries.
