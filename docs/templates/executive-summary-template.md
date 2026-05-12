# Executive Summary Template

Use this template with AI to create executive summaries for non-technical stakeholders.

## Template Structure

```markdown
[PROJECT NAME] - [Date]

## What We Did
[1-2 sentences explaining the work in business terms]

## Why It Matters
[Business context: revenue, risk, competitive advantage]

## Key Results
✓ [Result 1 with metric]
✓ [Result 2 with metric]
✓ [Result 3 with metric]
✓ [Result 4 with metric]

## Business Impact
- Before: [Baseline metric]
- After: [Improved metric]
- Revenue/Cost: [Dollar impact]

## Customer Impact
- [How users are affected]
- [User experience improvement]
- [Support/satisfaction metrics]

## What's Next
- [Next step 1 with date]
- [Next step 2 with date]
- [Future milestone]

Completed: [Date]
Team: [Size]
```

## AI Prompt Template

Use this prompt with ChatGPT, Claude, or other AI tools:

```
I need an executive summary for [PROJECT NAME]

Project details:
- Goal: [What problem were we solving]
- Duration: [Timeline]
- Team size: [Number of people]

Technical work completed:
- [Technical detail 1]
- [Technical detail 2]
- [Technical detail 3]

Business context:
- Company: [Type of company]
- Users: [Who are the users]
- Problem: [What pain point]
- Goal: [Business objective]

Metrics:
- Before: [Baseline metrics]
- After: [Improved metrics]

Target audience: [CEO / Product VP / Engineering Director]

Please create an executive summary that:
1. Explains business impact (not technical details)
2. Includes specific metrics and dollar impact
3. Highlights user experience improvements
4. Suggests next steps
5. Keep under 300 words
6. Avoid technical jargon
7. Focus on: [revenue/risk/user satisfaction/competitive advantage]
```

## Audience-Specific Guidelines

### For CEO
- **Focus**: Revenue, risk, competitive advantage
- **Metrics**: $$$, customer satisfaction, market share
- **Length**: 2-3 paragraphs (200 words max)
- **Tone**: Strategic, high-level
- **Example**: "Project increases Q2 revenue by $480K (4.5% conversion lift)"

### For Product VP
- **Focus**: User experience, metrics, roadmap
- **Metrics**: User satisfaction, engagement, feature usage
- **Length**: 3-4 paragraphs (300 words max)
- **Tone**: User-centric, data-driven
- **Example**: "Mobile checkout satisfaction improved from 3.2 to 4.1 stars"

### For Engineering Director
- **Focus**: Technical decisions, team, velocity
- **Metrics**: Test coverage, code quality, sprint velocity
- **Length**: 4-5 paragraphs + technical appendix (400-500 words)
- **Tone**: Balanced technical + business
- **Example**: "Team delivered on time with 85% coverage, ADR documented"

## Best Practices

### ✅ DO
- Start with business impact
- Use specific numbers (10x faster, +$120K/month)
- Explain "why" (15% of users reported slow checkout)
- Keep it short (250-300 words)
- Include "what's next"
- Have humans review AI output

### ❌ DON'T
- Use technical jargon without explanation
- Skip metrics ("made it faster" → "10x faster")
- Forget the "why" ("migrated to Zustand" → "fixed slow cart")
- Write too long (> 500 words)
- Publish AI output without review

## Metrics Translation Guide

### Technical → Business
```
❌ "Test coverage: 85%"
✅ "85% automated testing prevents bugs from reaching users"

❌ "Bundle size: 230KB gzipped"
✅ "Page load 40% faster, improving mobile conversion"

❌ "Render time: 50ms"
✅ "Cart updates 10x faster (500ms → 50ms)"

❌ "Lines of code: -1,500"
✅ "Simplified code reduces maintenance cost by 30%"
```

## Common Mistakes

### ❌ Too Technical
```
"We implemented a binary search tree with O(log n) lookup time
for cart item access instead of O(n) linear search."
```

### ✅ Business Focused
```
"Cart operations are now 10x faster, improving checkout speed
for customers."
```

### ❌ No Metrics
```
"We made the cart faster and more reliable."
```

### ✅ Specific Metrics
```
"Cart updates complete in 50ms instead of 500ms, reducing
checkout time from 5.1s to 3.4s."
```

### ❌ No "Why"
```
"Migrated from Context API to Zustand."
```

### ✅ Business Reason
```
"Fixed slow cart performance that caused 15% of users to
abandon checkout."
```

## Iterating with AI

1. **First draft**: Ask AI to generate summary
2. **Review**: Check for accuracy, missing metrics, wrong tone
3. **Feedback**: Give AI specific improvements
4. **Second draft**: AI regenerates with details
5. **Human finalize**: Verify facts, adjust tone, confirm metrics

### Example Iteration

**Your feedback to AI**:
```
Good start, but:
1. Be more specific about metrics (10x faster, 450ms removed)
2. Add revenue projection ($120K/month)
3. Include what's next (payment optimization)
4. Mention the user pain point (slow checkout complaints)

Regenerate with these details.
```

**AI improves**:
```
After 15% of mobile users reported slow checkout, we optimized
the shopping cart experience. Cart updates are now 10x faster
(500ms → 50ms), and checkout completes in 3.4 seconds instead
of 5.1. This projects to a 4.5% increase in mobile conversions,
estimated at +$120K/month. Next we'll tackle payment optimization
to further improve the flow.
```

## Word Count Targets

- **CEO Summary**: 200 words
- **Product VP**: 300 words
- **Engineering Director**: 400-500 words
- **Sprint Summary**: 150 words
- **Incident Report**: 250 words
- **Quarterly Update**: 400 words

If summary exceeds target → split into summary + technical appendix

## Quality Checklist

Before publishing, verify:

- [ ] Business impact is clear (revenue, risk, users)
- [ ] Specific metrics included (not vague "faster")
- [ ] "Why" explained (what problem was solved)
- [ ] No unexplained jargon (or jargon is defined)
- [ ] Under word count target
- [ ] "What's next" section included
- [ ] Human reviewed all facts and metrics
- [ ] Tested on non-technical person (they understand it)
