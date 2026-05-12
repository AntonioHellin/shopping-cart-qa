# Sprint Summary Template

Quick template for end-of-sprint summaries to stakeholders.

## Template Structure

```markdown
Sprint [NUMBER] Summary - [DATES]

## What We Shipped
✓ [Feature 1 - user benefit]
✓ [Feature 2 - user benefit]
✓ [Bug fix 3 - user impact]

## Metrics
- Story points: [X] completed ([X]% of commitment)
- User-facing features: [X]
- Bugs fixed: [X]
- Test coverage: [X]%

## User Impact
[1-2 sentences on how users are affected]

## Blockers Resolved
- [Blocker 1 - how resolved]
- [Blocker 2 - how resolved]

## Next Sprint
Focus: [Main theme]
Key deliverables:
- [Deliverable 1]
- [Deliverable 2]
```

## AI Prompt Template

```
I need a sprint summary for non-technical stakeholders.

Sprint details:
- Sprint number: [X]
- Dates: [Start - End]
- Team size: [X] developers

Work completed:
- [Feature 1 with technical details]
- [Feature 2 with technical details]
- [Bug fix 3 with technical details]

Sprint metrics:
- Committed: [X] points
- Completed: [X] points
- Velocity: [X] points

Blockers resolved:
- [Blocker 1]
- [Blocker 2]

Next sprint focus: [Theme]

Target audience: Product Manager, VP Engineering

Please create a sprint summary that:
1. Translates features to user benefits
2. Shows progress on sprint goals
3. Highlights blockers resolved
4. Previews next sprint
5. Keep under 200 words
6. Focus on user impact, not technical implementation
```

## Example

### Technical Version (for developers)
```
Sprint 23 - Jan 8-19

Completed:
- Migrated cart state from Context API to Zustand (8 pts)
- Implemented React.memo on ProductCard (3 pts)
- Fixed race condition in checkout flow (5 pts)
- Added E2E tests for cart operations (5 pts)

Metrics:
- Committed: 21 pts, Completed: 21 pts (100%)
- Test coverage: 82% → 85%
- Build time: 45s → 38s
- 0 production incidents
```

### Executive Version (for stakeholders)
```
Sprint 23 Summary - Jan 8-19

What We Shipped
✓ Faster cart experience (10x faster updates)
✓ Smoother product browsing (eliminated UI lag)
✓ More reliable checkout (fixed payment timeout issue)
✓ Automated testing for cart (prevents future bugs)

Impact
Cart performance complaints dropped from 15% to <2% of users.
Checkout completion time reduced from 5.1s to 3.4s.

Sprint Health
Delivered 100% of committed work (21 story points).
Zero production incidents. Test coverage improved to 85%.

Next Sprint (Jan 22 - Feb 2)
Focus: Payment optimization and mobile experience improvements.
Key deliverables: Apple Pay integration, mobile checkout redesign.
```

## Best Practices

### Focus on User Benefits
```
❌ "Implemented React.memo on ProductCard"
✅ "Made product browsing smoother (eliminated UI lag)"

❌ "Fixed race condition in checkout flow"
✅ "More reliable checkout (fixed payment timeout issue)"

❌ "Added E2E tests for cart operations"
✅ "Automated testing prevents cart bugs from reaching users"
```

### Show Progress Clearly
```
✅ Use ✓ checkmarks for completed items
✅ Include percentages (100% of commitment)
✅ Show before/after metrics (5.1s → 3.4s)
✅ Highlight zero incidents
```

### Keep It Short
- **Target**: 150-200 words
- **Maximum**: 250 words
- 1-2 minute read time
- Bullet points over paragraphs

## Quality Checklist

- [ ] Features translated to user benefits
- [ ] Sprint completion % shown
- [ ] Before/after metrics included
- [ ] Blockers resolution mentioned
- [ ] Next sprint preview clear
- [ ] Under 200 words
- [ ] No unexplained technical jargon
